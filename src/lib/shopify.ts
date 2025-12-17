const BEST_SELLING_QUERY = `
  query getBestSellingProducts {
    products(first: 5, sortKey: BEST_SELLING) {
      edges {
        node {
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
`;

const PRODUCTS_QUERY = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          productType
          totalInventory
          vendor
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchShopifyProducts() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    console.warn("Shopify credentials missing.");
    return null;
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
      }),
    });

    const json = await response.json();
    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      return null;
    }

    return json.data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Failed to fetch Shopify products:", error);
    return null;
  }
}

export async function fetchShopifyBestSellers() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN;

  if (!domain || !token) return null;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: BEST_SELLING_QUERY }),
    });

    const json = await response.json();
    return json.data?.products.edges.map((edge: any) => edge.node) || null;
  } catch (error) {
    console.error("Failed to fetch best sellers:", error);
    return null;
  }
}
