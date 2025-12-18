"use client";

import { BentoGrid } from "@/components/BentoGrid";
import { GlobalReach } from "@/components/GlobalReach";
import { ImpactCounter } from "@/components/ImpactCounter";
import { TopProduct } from "@/components/TopProduct";
import { SalesChart } from "@/components/SalesChart";
import { TopProductsList } from "@/components/TopProductsList";
import { VisitorStats } from "@/components/VisitorStats";
import { RegionSwitcher } from "@/components/RegionSwitcher";
import { useLocale } from "@/components/LocaleContext";
import { SomaedicLogo } from "@/components/SomaedicLogo";

interface PageContentProps {
  stats: {
    topProducts: any[];
    topSomavedics: any[];
    topAccessories: any[];
    totalCustomers: number;
    totalUnitsSold: number;
  } | null;
  mockData: {
    globalReach: {
      totalCountries: number;
      topRegions: string[];
    };
    salesTrends: any[];
  };
}

export function PageContent({ stats, mockData }: PageContentProps) {
  const { t } = useLocale();
  
  const bestSeller = stats?.topProducts[0] || null;
  const totalUnits = stats?.totalUnitsSold || 0;
  const harmonyHours = totalUnits > 0 ? totalUnits * 24 * 365 : 2450000;

  return (
    <main className="min-h-screen py-20 md:px-12 bg-[linear-gradient(90deg,#012169,#751475)]">
      {/* Header section */}
      <div className="max-w-7xl mx-auto mb-16 px-4 md:px-8">
        <div className="flex flex-row items-center justify-between gap-4 mb-8">
          <SomaedicLogo className="h-8 md:h-10 w-auto" />
          <RegionSwitcher />
        </div>
        <span className="text-somavedic-amber font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          {t.annualOverview}
        </span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
          {t.wrapped} <span className="text-white/20">2025</span>
        </h1>
        <p className="text-lg md:text-xl text-white/40 max-w-2xl font-medium">
          {t.heroDescription}
        </p>
      </div>

      {/* Grid section */}
      <BentoGrid>
        <GlobalReach 
          countries={mockData.globalReach.totalCountries} 
          topRegions={mockData.globalReach.topRegions} 
        />
        <TopProduct 
          product={bestSeller}
        />
        <TopProductsList 
          somavedics={stats?.topSomavedics || []} 
          accessories={stats?.topAccessories || []}
        />
        <VisitorStats 
          totalUnitsSold={totalUnits}
          totalCustomers={stats?.totalCustomers || 0}
          totalHours={harmonyHours}
        />
        <ImpactCounter 
          totalHours={harmonyHours} 
        />
        <SalesChart 
          data={mockData.salesTrends} 
        />
      </BentoGrid>

      {/* Footer / CTA */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:px-4">
        <div className="flex items-center gap-4">
           <img src="/somavedic-symbol.png" alt="Somavedic" className="w-10 h-10" />
           <span className="text-white tracking-tight">Somavedic 2025</span>
        </div>
        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
          {t.shareWithFriend}
        </button>
      </div>
    </main>
  );
}
