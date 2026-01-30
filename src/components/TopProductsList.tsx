"use client";

import { BentoCard } from "./BentoGrid";
import { Trophy, Zap, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "./LocaleContext";
import "./sr-only.css";

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

const ProductItem = ({ product, idx, maxQty, productUrl }: { product: ProductStat; idx: number; maxQty: number; productUrl: string }) => {
  const percentage = Math.round((product.quantity / maxQty) * 100);
  
  return (
    <motion.div
      key={product.title}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * idx }}
      className="flex items-center gap-4 group"
    >
      <div className="relative">
        <span 
          className="absolute -top-2 -left-2 w-5 h-5 bg-somavedic-amber text-black text-[10px] font-bold flex items-center justify-center rounded-full z-10"
          aria-label={`Rank ${idx + 1}`}
        >
          {idx + 1}
        </span>
        <a 
          href={productUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`${product.title} (opens in new tab)`}
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).umami) {
              (window as any).umami.track('view-popular-product', { product: product.title, category: product.category });
            }
          }}
          className="block w-20 h-16 bg-white/5 rounded-xl overflow-hidden border border-white/10 group-hover:border-somavedic-amber/30 transition-colors cursor-pointer"
        >
          {product.image ? (
            <img
              src={product.image}
              alt=""
              className="w-full h-full object-cover transition-all"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white/20" aria-hidden="true" />
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
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    
      <div 
        className="h-1 w-12 bg-white/5 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${product.title} popularity: ${percentage}%`}
      >
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
           className="h-full bg-somavedic-amber/50"
         />
      </div>
    </motion.div>
  );
};

export const TopProductsList = ({ somavedics, accessories }: TopProductsListProps) => {
  const { t, getProductLink } = useLocale();
  const maxSomavedicQty = somavedics[0]?.quantity || 1;
  const maxAccessoryQty = accessories[0]?.quantity || 1;

  return (
    <BentoCard
      badge={t.topPerformers}
      title={t.mostPopularProducts}
      description={t.popularProductsDesc}
      className="md:row-span-2"
    >
      <div className="mt-2 space-y-6">
        {/* Top 4 Somavedics */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-somavedic-amber" />
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">{t.topSomavedics}</h3>
          </div>
          <div className="space-y-4">
            {somavedics.slice(0, 4).map((product, idx) => (
              <ProductItem 
                key={product.title} 
                product={product} 
                idx={idx} 
                maxQty={maxSomavedicQty} 
                productUrl={getProductLink(product.handle || product.title.toLowerCase().replace(/ /g, '-'))}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Top 3 Accessories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-somavedic-amber" />
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">{t.topAccessories}</h3>
          </div>
          <div className="space-y-4">
            {accessories.slice(0, 3).map((product, idx) => (
              <ProductItem 
                key={product.title} 
                product={product} 
                idx={idx} 
                maxQty={maxAccessoryQty}
                productUrl={getProductLink(product.handle || product.title.toLowerCase().replace(/ /g, '-'))}
              />
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
