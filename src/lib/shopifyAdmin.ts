import { unstable_cache } from 'next/cache';

async function fetchShopifyStatsInternal() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!domain || !adminToken) {
    console.warn("Shopify Admin credentials missing.");
    return null;
  }

  const ORDERS_QUERY = `
    query getOrders($cursor: String) {
      orders(first: 250, query: "created_at:>=2025-01-01 -status:cancelled -test:true", after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            lineItems(first: 250) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    product {
                      id
                      title
                      handle
                      productType
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    let allOrders: any[] = [];
    let hasNextPage = true;
    let cursor = null;

    // Fetch all pages (limit to 10 pages / 2500 orders for performance)
    let pageCount = 0;
    while (hasNextPage && pageCount < 10) {
      pageCount++;
      const response: Response = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
        body: JSON.stringify({ 
          query: ORDERS_QUERY,
          variables: { cursor }
        }),
      });

      const json = await response.json();
      
      if (json.errors) {
        console.error("Shopify Admin API Errors:", json.errors);
        break;
      }

      const data = json.data.orders;
      allOrders = [...allOrders, ...data.edges];
      
      hasNextPage = data.pageInfo.hasNextPage;
      cursor = data.pageInfo.endCursor;
    }
    
    // Aggregate Product Sales
    const productSales: Record<string, { title: string; quantity: number; image: string; handle: string; category: 'somavedic' | 'accessory' }> = {};

    // Known accessory keywords (products with these in title/handle are accessories)
    const ACCESSORY_KEYWORDS = [
      'stand', 'plate', 'coaster', 'book', 'pendant', 'bracelet', 
      'necklace', 'jewelry', 'accessory', 'bundle', 'gift card',
      'protection card', 'card holder', 'charging', 'case'
    ];

    // Helper to determine category based on productType and title
    const getProductCategory = (productType: string, title: string, handle: string): 'somavedic' | 'accessory' => {
      const titleLower = title.toLowerCase();
      const handleLower = handle.toLowerCase();
      const typeLower = productType?.toLowerCase() || '';
      
      // Check if productType is explicitly "Accessory" or similar
      if (typeLower.includes('accessor')) return 'accessory';
      
      // Check if title/handle contains accessory keywords
      const isAccessory = ACCESSORY_KEYWORDS.some(keyword => 
        titleLower.includes(keyword) || handleLower.includes(keyword)
      );
      
      if (isAccessory) return 'accessory';
      
      // Default: assume it's a Somavedic device
      return 'somavedic';
    };

    allOrders.forEach((order: any) => {
      order.node.lineItems.edges.forEach((item: any) => {
        const product = item.node.variant?.product;
        // Fallback to line item title if product is null (deleted) but usually we want product grouping
        const title = product?.title || item.node.title;
        const id = product?.id || item.node.title; // simple fallback key
        const image = product?.images?.edges[0]?.node?.url || "";
        const productType = product?.productType || "";

        if (!productSales[id]) {
          productSales[id] = {
            title,
            quantity: 0,
            image,
            handle: product?.handle || "",
            category: getProductCategory(productType, title, product?.handle || ""),
          };
        }
        productSales[id].quantity += item.node.quantity;
      });
    });

    // Sort by quantity and filter out 'MonkProtect™'
    const sortedProducts = Object.values(productSales)
      .filter(p => !p.title.includes("MonkProtect") && !p.title.includes("Mystery Gift") && !p.title.includes("Power Cable"))
      .sort((a, b) => b.quantity - a.quantity);

    // Fetch Total Order Count (REST API is faster for count than iterating GraphQL)
    let totalOrderCount = allOrders.length;
    try {
      const countResponse = await fetch(`https://${domain}/admin/api/2024-01/orders/count.json?created_at_min=2025-01-01&status=any`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
      });
      const countJson = await countResponse.json();
      if (countJson.count) {
        totalOrderCount = countJson.count; 
      }
    } catch (e) {
      console.error("Failed to fetch order count:", e);
    }

    // Heuristic for Visits (ShopifyQL is strictly limited on many plans)
    // Adjusted to ~0.6% conversion rate based on historical range (1555 orders ~= 250k visits)
    // Multiplier: 163
    const totalVisits = totalOrderCount * 163;

    // Fetch Total Customers (2025)
    let totalCustomers = 0;
    try {
      const custResponse = await fetch(`https://${domain}/admin/api/2024-01/customers/count.json?created_at_min=2025-01-01`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
      });
      const custJson = await custResponse.json();
      if (custJson.count) {
        totalCustomers = custJson.count;
      }
    } catch (e) {
      console.error("Failed to fetch customer count:", e);
    }

    // Separate into Somavedics and Accessories
    const topSomavedics = sortedProducts.filter(p => p.category === 'somavedic').slice(0, 6);
    const topAccessories = sortedProducts.filter(p => p.category === 'accessory').slice(0, 4);

    return {
      topProducts: sortedProducts.slice(0, 10), // Keep for backward compatibility
      topSomavedics,
      topAccessories,
      totalVisits,
      totalCustomers,
      totalOrders: totalOrderCount, // Use the real total count
      totalUnitsSold: sortedProducts.reduce((acc, p) => acc + p.quantity, 0)
    };

  } catch (error) {
    console.error("Failed to fetch Admin stats:", error);
    return null;
  }
}

// Cache the expensive Shopify API calls for 1 hour
export const fetchAdminShopifyStats = unstable_cache(
  fetchShopifyStatsInternal,
  ['shopify-admin-stats'],
  { revalidate: 3600 } // 1 hour
);
