"use client";

import { BentoCard } from "./BentoGrid";
import { useLocale } from "./LocaleContext";

interface VisitorStatsProps {
  totalUnitsSold: number;
  totalCustomers: number;
  totalHours: number;
}

export const VisitorStats = ({ totalUnitsSold, totalCustomers, totalHours }: VisitorStatsProps) => {
  const { t, region } = useLocale();
  const usesMetric = region.usesMetric;
  
  // Map language codes to locale strings for number formatting
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'de': 'de-DE',
    'cs': 'cs-CZ',
  };
  const locale = localeMap[region.language] || 'en-US';
  
  // Imperial: 2,800 sq ft coverage per unit, 480 gallons/year per unit
  // Metric: 260 m² coverage per unit, 1,825 liters/year per unit (5L/day)
  const sqFtProtected = totalUnitsSold * 2800;
  const sqMProtected = totalUnitsSold * 260;
  const gallonsStructured = totalUnitsSold * 480;
  const litersStructured = totalUnitsSold * 1825; // 5L/day * 365 days

  // Format values based on unit system
  const areaValue = usesMetric 
    ? (sqMProtected / 1000000).toFixed(1) 
    : (sqFtProtected / 1000000).toFixed(1);
  const areaLabel = usesMetric ? t.sqMProtected : t.sqFtProtected;
  const areaNote = usesMetric ? t.sqMNote : t.sqFtNote;
  const waterUnit = usesMetric ? t.literUnit : t.gallonUnit;

  return (
    <BentoCard
      badge={t.somavedicImpact}
      className="bg-gradient-to-tr from-emerald-500/10 to-transparent"
    >
      <div className="space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {areaValue}M+
        </h3>
        <p className="text-md text-white/60 font-medium">{areaLabel}</p>
        <p className="text-[10px] text-white/20 mt-1">{areaNote}</p>
      </div>

      <div className="mt-8 space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {(usesMetric ? litersStructured : gallonsStructured).toLocaleString(locale)} <span className="text-2xl text-white/20">{waterUnit}</span>
        </h3>
        <p className="text-md text-white/60 font-medium">{t.waterStructured}</p>
        <p className="text-[10px] text-white/20 mt-1">{t.waterNote}</p>
      </div>

      <div className="mt-8 space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {totalHours.toLocaleString(locale)}
        </h3>
        <p className="text-md text-white/60 font-medium">{t.totalHoursHarmony}</p>
      </div>

      <div className="mt-8 space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          100
        </h3>
        <p className="text-md text-white/60 font-medium">{t.giftedSomavedics}</p>
      </div>
    </BentoCard>
  );
};
