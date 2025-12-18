"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { TrendingUp } from "lucide-react";
import { useLocale } from "./LocaleContext";

interface SalesChartProps {
  data: { month: string; sales: number }[];
}

export const SalesChart = ({ data }: SalesChartProps) => {
  const { t } = useLocale();
  const maxSales = Math.max(...data.map((d) => d.sales));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.sales / maxSales) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <BentoCard
      badge={t.yearlyTrends}
      title={t.momentum}
      description={t.momentumDesc}
      className="md:col-span-2 overflow-hidden"
    >
      <div className="mt-8 relative h-32 w-full">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((line) => (
            <line
              key={line}
              x1="0"
              y1={line}
              x2="100"
              y2={line}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Area under the path */}
          <path
            d={`M 0,100 L ${points} L 100,100 Z`}
            fill="url(#gradient)"
            opacity="0.2"
          />
          
          {/* Main path */}
          <motion.polyline
            fill="none"
            stroke="#FFB800"
            strokeWidth="2"
            points={points}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {data.map((d, i) => {
             const x = (i / (data.length - 1)) * 100;
             const y = 100 - (d.sales / maxSales) * 100;
             return (
               <motion.circle
                 key={i}
                 cx={x}
                 cy={y}
                 r="1.5"
                 fill="#FFB800"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1 + i * 0.1 }}
               />
             );
          })}

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB800" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-wider">
        <span>Jan</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-2 text-somavedic-amber">
        <TrendingUp className="w-4 h-4" />
        <span className="text-xs font-bold">+184% {t.yoy}</span>
      </div>
    </BentoCard>
  );
};
