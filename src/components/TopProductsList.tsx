"use client";

import { BentoCard } from "./BentoGrid";
import { Trophy, Zap, Package } from "lucide-react";
import { motion } from "framer-motion";

interface ProductStat {
  title: string;
  quantity: number;
  image: string;
  handle?: string;
  category?: 'somavedic' | 'accessory';
}

interface TopProductsListProps {
  somavedics: ProductStat[];
  accessories: ProductStat[];
}

const ProductItem = ({ product, idx, maxQty }: { product: ProductStat; idx: number; maxQty: number }) => {
  const productUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'somavedic.com'}/products/${product.handle || product.title.toLowerCase().replace(/ /g, '-')}`;

  return (
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
        <a 
          href={productUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-20 h-16 bg-white/5 rounded-xl overflow-hidden border border-white/10 group-hover:border-somavedic-amber/30 transition-colors cursor-pointer"
        >
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
        </a>
      </div>
      
      <div className="flex-1 min-w-0">
        <a 
          href={productUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block cursor-pointer"
        >
          <h4 className="text-sm font-medium text-white truncate group-hover:text-somavedic-amber transition-colors group-hover:underline underline-offset-4 decoration-somavedic-amber/50">
            {product.title}
          </h4>
        </a>
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
  );
};

export const TopProductsList = ({ somavedics, accessories }: TopProductsListProps) => {
  const maxSomavedicQty = somavedics[0]?.quantity || 1;
  const maxAccessoryQty = accessories[0]?.quantity || 1;

  return (
    <BentoCard
      badge="Top Performers"
      title="Most Popular Products"
      description="The models that brought harmony to the most homes in 2025."
      className="md:row-span-2"
    >
      <div className="mt-2 space-y-6">
        {/* Top 6 Somavedics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-somavedic-amber" />
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">Top 6 Somavedics</h3>
          </div>
          <div className="space-y-4">
            {somavedics.map((product, idx) => (
              <ProductItem key={product.title} product={product} idx={idx} maxQty={maxSomavedicQty} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Top 4 Accessories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-somavedic-amber" />
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">Top 4 Accessories</h3>
          </div>
          <div className="space-y-4">
            {accessories.map((product, idx) => (
              <ProductItem key={product.title} product={product} idx={idx} maxQty={maxAccessoryQty} />
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
