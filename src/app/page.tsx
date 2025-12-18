import { PageContent } from "@/components/PageContent";
import { MOCK_DATA } from "@/lib/mockData";
import { fetchAdminShopifyStats } from "@/lib/shopifyAdmin";

export default async function Home() {
  const stats = await fetchAdminShopifyStats();

  return (
    <PageContent 
      stats={stats} 
      mockData={{
        globalReach: MOCK_DATA.globalReach,
        salesTrends: MOCK_DATA.salesTrends,
      }}
    />
  );
}
