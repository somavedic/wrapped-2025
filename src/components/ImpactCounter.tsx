"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Zap } from "lucide-react";

interface ImpactCounterProps {
  totalHours: number;
}

export const ImpactCounter = ({ totalHours }: ImpactCounterProps) => {
  const springValue = useSpring(0, {
    stiffness: 20,
    damping: 15,
  });

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    springValue.set(totalHours);
  }, [totalHours, springValue]);

  return (
    <BentoCard
      badge="Impact"
      className="bg-gradient-to-br from-somavedic-amber/10 to-transparent"
    >
      <div className="flex items-center gap-2 text-somavedic-amber mb-6">
        <Zap className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold uppercase tracking-wider">Active Harmonization</span>
      </div>

      <div className="flex flex-col">
        <motion.span className="text-4xl md:text-5xl font-bold tracking-tighter text-white tabular-nums">
          <motion.span>{displayValue}</motion.span>
        </motion.span>
        <span className="text-sm text-white/40 mt-2 font-medium">
          Total Hours of Harmony created in 2025
        </span>
      </div>

      <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-full bg-somavedic-amber shadow-[0_0_10px_rgba(255,184,0,0.5)]"
        />
      </div>
    </BentoCard>
  );
};
