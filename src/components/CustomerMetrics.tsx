"use client";

import { BentoCard } from "./BentoGrid";
import { Smile, RotateCcw, HeadphonesIcon } from "lucide-react";
import { useLocale } from "./LocaleContext";

export const CustomerMetrics = () => {
  const { t } = useLocale();
  
  return (
    <>
      {/* Customer Satisfaction */}
      <BentoCard
        badge={t.customerMetricsBadge}
        className="bg-gradient-to-br from-somavedic-amber/10 to-transparent"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <Smile className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.customerSatisfaction}</span>
          </div>
          <h3 className="text-5xl font-bold tracking-tighter text-white">+98%</h3>
          <p className="text-sm text-white/60 leading-tight">{t.customerSatisfactionDesc}</p>
        </div>
      </BentoCard>

      {/* Returns */}
      <BentoCard
        badge={t.customerMetricsBadge}
        className="bg-gradient-to-br from-somavedic-amber/10 to-transparent"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.returns}</span>
          </div>
          <h3 className="text-5xl font-bold tracking-tighter text-white">&lt;1.5%</h3>
          <p className="text-sm text-white/60 leading-tight">{t.returnsDesc}</p>
        </div>
      </BentoCard>

      {/* Support Tickets */}
      <BentoCard
        badge={t.customerMetricsBadge}
        className="bg-gradient-to-br from-somavedic-amber/10 to-transparent"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <HeadphonesIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.supportTickets}</span>
          </div>
          <h3 className="text-5xl font-bold tracking-tighter text-white">&lt;1 {t.day}</h3>
          <p className="text-sm text-white/60 leading-tight">{t.supportTicketsDesc}</p>
        </div>
      </BentoCard>
    </>
  );
};
