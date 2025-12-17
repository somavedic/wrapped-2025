"use client";

import { BentoCard } from "./BentoGrid";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface ProductStat {
  title: string;
  quantity: number;
  image: string;
}

interface TopProductsListProps {
  products: ProductStat[];
}

export const TopProductsList = ({ products }: TopProductsListProps) => {
  const maxQty = products[0]?.quantity || 1;

  return (
    <BentoCard
      badge="Top Performers"
      title="Most Popular Products"
      description="The models that brought harmony to the most homes in 2025."
      className="md:row-span-2"
    >
      <div className="mt-8 space-y-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <span className="absolute -top-2 -left-2 w-5 h-5 bg-somavedic-amber text-black text-[10px] font-bold flex items-center justify-center rounded-full z-10">
                {idx + 1}
              </span>
              <div className="w-12 h-12 bg-white/5 rounded-xl overflow-hidden border border-white/10 group-hover:border-somavedic-amber/30 transition-colors">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white/20" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate group-hover:text-somavedic-amber transition-colors">
                {product.title}
              </h4>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                {product.quantity.toLocaleString()} units sold
              </p>
            </div>
            
            <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(product.quantity / maxQty) * 100}%` }}
                 transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                 className="h-full bg-somavedic-amber/50"
               />
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
};
