import { BentoGrid } from "@/components/BentoGrid";
import { GlobalReach } from "@/components/GlobalReach";
import { ImpactCounter } from "@/components/ImpactCounter";
import { TopProduct } from "@/components/TopProduct";
import { SalesChart } from "@/components/SalesChart";
import { TopProductsList } from "@/components/TopProductsList";
import { VisitorStats } from "@/components/VisitorStats";
import { MOCK_DATA } from "@/lib/mockData";
import { fetchAdminShopifyStats } from "@/lib/shopifyAdmin";

export default async function Home() {
  const stats = await fetchAdminShopifyStats();
  
  // Best Seller
  const bestSeller = stats?.topProducts[0] || null;
  
  // Calculate Harmony Hours: Units Sold * 24h * 365d
  // Default to mock 2.4M if 0 (e.g. API fail)
  const totalUnits = stats?.totalUnitsSold || 0;
  const harmonyHours = totalUnits > 0 ? totalUnits * 24 * 365 : 2450000;

  return (
    <main className="min-h-screen py-20 px-4 md:px-12 bg-[linear-gradient(90deg,#012169,#751475)]">
      {/* Header section */}
      <div className="max-w-7xl mx-auto mb-16 text-center md:text-left px-4">
        <span className="text-somavedic-amber font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          Somavedic Annual Overview
        </span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
          Wrapped <span className="text-white/20">2025</span>
        </h1>
        <p className="text-lg md:text-xl text-white/40 max-w-2xl font-medium">
          A year of harmony, growth, and global impact. Let's look back at how we protected spaces across the world in 2025.
        </p>
      </div>

      {/* Grid section */}
      <BentoGrid>
        <GlobalReach 
          countries={MOCK_DATA.globalReach.totalCountries} 
          topRegions={MOCK_DATA.globalReach.topRegions} 
        />
        <TopProduct 
          product={bestSeller}
        />
        <TopProductsList 
          products={stats?.topProducts || []} 
        />
        <VisitorStats 
          totalVisits={stats?.totalVisits || 252798} 
          totalOrders={stats?.totalOrders || 0}
        />
        <ImpactCounter 
          totalHours={harmonyHours} 
        />
        <SalesChart 
          data={MOCK_DATA.salesTrends} 
        />
      </BentoGrid>

      {/* Footer / CTA */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-somavedic-amber rounded-full" />
           <span className="font-bold text-white tracking-tight">somavedic.com</span>
        </div>
        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
          Share Your Year
        </button>
      </div>
    </main>
  );
}
