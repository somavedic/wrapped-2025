"use client";

import { BentoCard } from "./BentoGrid";
import { Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface VisitorStatsProps {
  totalVisits: number;
  totalOrders: number;
}

export const VisitorStats = ({ totalVisits, totalOrders }: VisitorStatsProps) => {
  return (
    <BentoCard
      badge="Store Traffic"
      className="bg-gradient-to-tr from-blue-500/10 to-transparent"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <Users className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {totalVisits.toLocaleString()}
        </h3>
        <p className="text-sm text-white/40 font-medium">Store Visits in 2025</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider">Total Orders</p>
          <p className="text-sm font-bold text-white mt-1">{totalOrders.toLocaleString()}</p>
        </div>
      </div>
    </BentoCard>
  );
};
