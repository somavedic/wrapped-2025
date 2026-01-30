"use client";

import { BentoCard } from "./BentoGrid";
import { Shield, Heart, Sparkles, Wind, ExternalLink } from "lucide-react";
import { useLocale } from "./LocaleContext";
import "./sr-only.css";

interface ImpactCounterProps {
  totalHours: number;
}

export const ImpactCounter = ({ totalHours }: ImpactCounterProps) => {
  const { t, region } = useLocale();
  
  const scienceUrl = `https://${region.domain}/pages/science`;
  
  return (
    <BentoCard
      badge={t.researchHighlights}
      className="bg-gradient-to-br from-somavedic-amber/10 to-transparent"
    >
      <div className="grid grid-cols-1 gap-8">
        {/* Cell Protection */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.cellProtection}</span>
          </div>
          <h3 className="text-3xl font-bold tracking-tighter text-white">80.1%</h3>
          <p className="text-sm text-white/60 leading-tight">{t.cellRecoveryDesc}</p>
        </div>

        {/* Inflammation */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.inflammation}</span>
          </div>
          <h3 className="text-3xl font-bold tracking-tighter text-white">58%</h3>
          <p className="text-sm text-white/60 leading-tight">{t.inflammationDesc}</p>
        </div>

        {/* Ion Boost */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.airQuality}</span>
          </div>
          <h3 className="text-3xl font-bold tracking-tighter text-white">2x</h3>
          <p className="text-sm text-white/60 leading-tight">{t.airQualityDesc}</p>
        </div>

        {/* Optimal Ions */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-somavedic-amber">
            <Wind className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.ionLevels}</span>
          </div>
          <h3 className="text-3xl font-bold tracking-tighter text-white">10x</h3>
          <p className="text-sm text-white/60 leading-tight">{t.ionLevelsDesc}</p>
        </div>
      </div>

      {/* Science page link */}
      <a
        href={scienceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full border border-white/20 text-sm text-white/80 hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300"
      >
        {t.seeScience}
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    </BentoCard>
  );
};
