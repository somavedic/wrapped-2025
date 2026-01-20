"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoGrid";
import { Star, ExternalLink } from "lucide-react";
import { useLocale } from "./LocaleContext";

export const CustomerTestimonial = () => {
  const { t, region } = useLocale();
  
  const reviewsUrl = `https://${region.domain}/pages/somavedic-reviews`;

  return (
    <BentoCard
      badge={t.testimonialBadge}
      className="md:col-span-2 overflow-hidden"
    >
      <div className="mt-2 relative">
        {/* Star rating and date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
              >
                <Star className="w-5 h-5 fill-somavedic-amber text-somavedic-amber" />
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-white/40">{t.testimonialDate}</span>
        </div>
        
        {/* Testimonial title */}
        <motion.h4 
          className="text-lg font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {t.testimonialHeadline}
        </motion.h4>
        
        {/* Testimonial text */}
        <motion.p 
          className="text-sm text-white/70 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {t.testimonialText}
        </motion.p>
        
        {/* Author info and See reviews button */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-somavedic-purple to-somavedic-amber flex items-center justify-center text-white font-bold text-sm">
              {t.testimonialAuthorInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t.testimonialAuthor}</p>
              <p className="text-xs text-white/40 flex items-center gap-1">
                <span>📍</span>
                {t.testimonialLocation}
              </p>
            </div>
          </div>

          {/* See reviews button */}
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).umami) {
                (window as any).umami.track('click-see-reviews', { region: region.code });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-white/80 hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300"
          >
            {t.seeReviews}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </BentoCard>
  );
};
