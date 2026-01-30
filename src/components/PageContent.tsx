"use client";

import React from "react";

import { BentoGrid } from "@/components/BentoGrid";
import { GlobalReach } from "@/components/GlobalReach";
import { ImpactCounter } from "@/components/ImpactCounter";
import { TopProduct } from "@/components/TopProduct";
import { CustomerTestimonial } from "@/components/CustomerTestimonial";
import { TopProductsList } from "@/components/TopProductsList";
import { VisitorStats } from "@/components/VisitorStats";
import { RegionSwitcher } from "@/components/RegionSwitcher";
import { CustomerMetrics } from "@/components/CustomerMetrics";
import { FutureDeviceTeaser } from "@/components/FutureDeviceTeaser";
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
  
  // Find Vedic Gen 2 specifically as the featured product
  const vedicGen2 = stats?.topProducts.find((p: any) => 
    p.title.toLowerCase().includes('vedic') && 
    (p.title.toLowerCase().includes('gen 2') || p.title.toLowerCase().includes('gen. 2') || p.title.toLowerCase().includes('generation 2'))
  );
  const bestSeller = vedicGen2 || stats?.topProducts[0] || null;
  const totalUnits = stats?.totalUnitsSold || 0;
  const harmonyHours = totalUnits > 0 ? totalUnits * 24 * 365 : 2450000;

  const [isCopied, setIsCopied] = React.useState(false);

  const handleShare = async () => {
    const shareData = {
      title: t.wrapped + ' 2025',
      text: t.heroDescription,
      url: window.location.href,
    };

    // Try native share first
    if (typeof navigator.share !== 'undefined') {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // If user cancelled, do nothing. We don't fallback to clipboard here
        // because the async dialog causes loss of focus/activation, 
        // leading to 'Document is not focused' errors.
        console.log('Share cancelled or failed:', err);
      }
      return; 
    }

    // Fallback to clipboard (only if native share is unavailable)
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <main className="min-h-screen md:px-12 bg-[#140517] overflow-x-hidden">
      {/* New Device Teaser - Full Viewport Section (includes logo and region switcher) */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <FutureDeviceTeaser />
      </div>

      {/* Header section */}
      <div className="max-w-7xl mx-auto mb-16 px-4 md:px-8 mt-24">
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
        <CustomerTestimonial />
        <CustomerMetrics />
      </BentoGrid>

      {/* Footer / CTA */}
      <div className="max-w-7xl mx-auto mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:px-4">
         <div className="flex items-center gap-4">
            <img src="/somavedic-symbol.png" alt="Somavedic logo" className="w-10 h-10" />
           <span className="text-white tracking-tight">Somavedic 2025</span>
        </div>
        <button 
          type="button"
          onClick={handleShare}
          aria-live="polite"
          aria-atomic="true"
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-all active:scale-95"
        >
          {isCopied ? t.linkCopied : t.shareWithFriend}
        </button>
      </div>
    </main>
  );
}
