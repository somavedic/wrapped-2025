"use client";

import Image from "next/image";
import { BentoCard } from "./BentoGrid";
import { Star, ArrowUpRight } from "lucide-react";
import { useLocale } from "./LocaleContext";
import "./sr-only.css";

interface TopProductProps {
  product: {
    title: string;
    image: string;
    quantity: number;
    handle?: string;
  } | null;
}

export const TopProduct = ({ product }: TopProductProps) => {
  const { t, getProductLink } = useLocale();
  
  if (!product) return null;

  const productUrl = getProductLink(product.handle || product.title.toLowerCase().replace(/ /g, '-'));

  return (
    <BentoCard
      badge={t.yourFavorite}
      title={t.communityChoice}
      description={t.bestSellingDesc}
      className="md:col-span-1"
    >
      <div className="flex flex-col h-full">
          <a 
           href={productUrl} 
           target="_blank" 
           rel="noopener noreferrer"
           onClick={() => {
             if (typeof window !== 'undefined' && (window as any).umami) {
               (window as any).umami.track('view-featured-product', { product: product.title });
             }
           }}
           className="block group relative rounded-2xl overflow-hidden border border-white/10 h-64 cursor-pointer"
         >
             <span className="sr-only">{product.title} (opens in new tab)</span>
              <Image 
                src={product.image} 
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             
             <div className="absolute bottom-4 left-4 right-4">
               <h3 className="text-xl font-bold text-white mb-1 group-hover:underline underline-offset-4 decoration-somavedic-amber/50">{product.title}</h3>
                <div className="flex items-center gap-1 text-somavedic-amber">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs text-white/50 ml-2">(Best Seller)</span>
                </div>
              </div>
           </a>
         
          <a 
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).umami) {
                (window as any).umami.track('click-view-product-button', { product: product.title });
              }
            }}
            className="mt-4 w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-somavedic-amber transition-colors"
          >
            {t.viewProduct} <ArrowUpRight className="w-4 h-4" />
            <span className="sr-only">(opens in new tab)</span>
          </a>
      </div>
    </BentoCard>
  );
};
