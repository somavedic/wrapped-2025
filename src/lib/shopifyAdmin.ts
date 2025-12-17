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

    // Fetch all pages
    while (hasNextPage) {
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
      .filter(p => !p.title.includes("MonkProtect"))
      .sort((a, b) => b.quantity - a.quantity);

    // Fetch Real Visits using ShopifyQL
    let totalVisits = 0;
    try {
      const VISITS_QUERY = `
        {
          shopifyqlQuery(query: "FROM sessions SHOW sessions SINCE 2025-01-01 UNTIL 2025-12-31") {
            tableData {
              rowData
            }
          }
        }
      `;

      const visitsResponse = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
        body: JSON.stringify({ query: VISITS_QUERY }),
      });

      const visitsJson = await visitsResponse.json();
      if (!visitsJson.errors && visitsJson.data?.shopifyqlQuery?.tableData?.rowData) {
        // rowData is [['252798']] type structure
        totalVisits = parseInt(visitsJson.data.shopifyqlQuery.tableData.rowData[0]?.[0] || "0", 10);
      } else {
        console.warn("ShopifyQL failed, using fallback:", visitsJson.errors);
      }
    } catch (err) {
      console.error("Failed to fetch visits via ShopifyQL:", err);
    }

    // Fetch New Customers (Proxy for New Users)
    let newCustomers = 0;
    try {
      const CUSTOMERS_QUERY = `
        query getNewCustomers {
          customers(first: 0, query: "created_at:>=2025-01-01") {
            searchCount {
              count
            }
          }
        }
      `;
       const custResponse = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
        body: JSON.stringify({ query: CUSTOMERS_QUERY }),
      });
      const custJson = await custResponse.json();
      newCustomers = custJson.data?.customers?.searchCount?.count || 0;
    } catch (e) {
      console.error("Failed to fetch customers:", e);
    }

    return {
      topProducts: sortedProducts.slice(0, 10), // Increased to 10
      totalVisits,
      newCustomers,
      totalOrders: allOrders.length,
      totalUnitsSold: sortedProducts.reduce((acc, p) => acc + p.quantity, 0)
    };

  } catch (error) {
    console.error("Failed to fetch Admin stats:", error);
    return null;
  }
}
