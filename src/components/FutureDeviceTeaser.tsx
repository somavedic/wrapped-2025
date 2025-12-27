"use client";

import { useLocale } from "@/components/LocaleContext";
import { LightRays } from "@/components/ui/LightRays";
import { StarBorder } from "@/components/ui/StarBorder";
import { TextType } from "@/components/ui/TextType";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BentoCard } from "./BentoGrid";

export const FutureDeviceTeaser = () => {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing email to Future Device Q2 2026 list:", email);
      // In a real implementation, you would send this to your Klaviyo API
      // const listId = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID;
      // ... submit logic
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <BentoCard
      title="" // Custom title mapping inside
      className="md:col-span-2 lg:col-span-3 min-h-[500px] relative overflow-hidden group border-somavedic-amber/20"
    >
      {/* Background Animation */}
      <LightRays className="opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-4 md:px-8 py-12 w-full text-center">
        
        {/* 1) Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
            <TextType 
              text={t.futureDeviceTitle} 
              className="block min-h-[1.2em]" 
              speed={80}
            />
          </h2>
          <p className="text-xl md:text-2xl text-somavedic-amber font-light tracking-wide uppercase">
            {t.futureDeviceSubtitle}
          </p>
        </div>

        {/* 2) Full Container Width Image */}
        <div className="w-full relative flex items-center justify-center my-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full aspect-video md:aspect-[21/9] max-w-6xl"
          >
            <div className="absolute inset-0 bg-somavedic-amber/10 blur-[80px] rounded-full opacity-30 animate-pulse" />
            <Image
              src="/elaura-mockup-optimised.png"
              alt="Future Somavedic Device Blueprint"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(225,55,225,0.4)]"
            />
          </motion.div>
        </div>

        {/* 3) Subscription Form */}
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-somavedic-amber/50 transition-all text-center"
                required
              />
            </div>
            
            <StarBorder 
              as="button" 
              type="submit" 
              color="#e137e1" 
              speed="3s"
              className="w-full"
            >
              <span className="flex items-center justify-center gap-2 font-bold tracking-wide uppercase">
                {isSubmitted ? (
                  "Subscribed!"
                ) : (
                  <>
                    {t.notifyMe} <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </span>
            </StarBorder>
          </form>
        </div>

      </div>
    </BentoCard>
  );
};
