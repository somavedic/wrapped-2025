"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { CobeGlobe } from "./CobeGlobe";
import { useLocale } from "./LocaleContext";

interface GlobalReachProps {
  countries: number;
  topRegions: string[];
}

export const GlobalReach = ({ countries, topRegions }: GlobalReachProps) => {
  const { t } = useLocale();
  
  return (
    <BentoCard
      badge={t.globalReach}
      title={`${countries} ${t.countries}`}
      description={t.harmonizingSpaces}
      className="md:col-span-2 lg:col-span-2 overflow-hidden relative min-h-[400px] md:min-h-full"
    >
      <div 
        className="absolute -right-24 -bottom-24 md:-right-20 md:-bottom-20 w-[500px] h-[500px] md:w-[600px] md:h-[600px] pointer-events-none md:pointer-events-auto mix-blend-lighten"
        style={{ isolation: 'isolate' }}
      >
         <CobeGlobe />
      </div>
      
      <div className="flex flex-wrap gap-2 relative z-10">
        {topRegions.map((region, idx) => (
          <motion.span
            key={region}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="px-4 py-2 rounded-full glass text-xs font-medium text-white/70"
          >
            {t.countryNames[region] || region}
          </motion.span>
        ))}
      </div>

      <div className="mt-12 flex items-baseline gap-2">
        <span className="text-5xl font-bold text-glow-amber text-white tracking-tighter">
          {countries}
        </span>
        <span className="text-sm uppercase tracking-widest text-white/30 font-semibold">
          {t.marketsActive}
        </span>
      </div>
    </BentoCard>
  );
};
