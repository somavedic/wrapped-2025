export async function fetchAdminShopifyStats() {
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
      const response = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
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
    const productSales: Record<string, { title: string; quantity: number; image: string; handle: string }> = {};

    allOrders.forEach((order: any) => {
      order.node.lineItems.edges.forEach((item: any) => {
        const product = item.node.variant?.product;
        // Fallback to line item title if product is null (deleted) but usually we want product grouping
        const title = product?.title || item.node.title;
        const id = product?.id || item.node.title; // simple fallback key
        const image = product?.images?.edges[0]?.node?.url || "";

        if (!productSales[id]) {
          productSales[id] = {
            title,
            quantity: 0,
            image,
            handle: product?.handle || "",
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

    return {
      topProducts: sortedProducts.slice(0, 10), // Increased to 10
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
