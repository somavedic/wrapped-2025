"use client";

import Image from "next/image";
import { useLocale } from "@/components/LocaleContext";
import { cn } from "@/lib/utils";
import "./sr-only.css";
import { LightRays } from "@/components/ui/LightRays";
import { StarBorder } from "@/components/ui/StarBorder";
import { TextType } from "@/components/ui/TextType";
import { RegionSwitcher } from "@/components/RegionSwitcher";
import { SomaedicLogo } from "@/components/SomaedicLogo";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

export const FutureDeviceTeaser = () => {
  const { t, region } = useLocale();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      setErrorMessage("");
      
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            region: region.code 
          }),
        });

        if (!response.ok) {
          throw new Error('Subscription failed');
        }

        if (typeof window !== 'undefined' && (window as any).umami) {
          (window as any).umami.track('newsletter-signup', { region: region.code });
        }
        
        // Send form_submit event to GTM dataLayer
        sendGTMEvent({
          event: 'form_submit',
          form_name: 'newsletter_signup',
          form_destination: region.code,
        });
        
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 5000);
      } catch (error) {
        console.error(error);
        setErrorMessage(t.formError);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="relative w-full min-h-[auto] md:h-[80vh] overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[#0b030d] z-0" />
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-somavedic-amber/15 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#e137e1]/10 blur-[120px] rounded-full" />
      </div>

      {/* Background Animation */}
      <LightRays className="opacity-20 z-0" />
      
      {/* Content Container */}
      <div className="relative z-10 h-full">
        {/* Logo and Region Switcher Header */}
        <div className="lg:absolute top-0 left-0 right-0 z-20 px-4 md:px-12 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-row items-center justify-between gap-4">
              <SomaedicLogo className="h-8 md:h-10 w-auto" />
              <RegionSwitcher />
            </div>
          </div>
        </div>

        {/* Main Layout - Contained form + Edge-to-edge image */}
        <div className="h-full flex flex-col lg:flex-row lg:pt-0">
          {/* Left side - Form Container (aligned with max-w-7xl) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[640px] flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-6 px-6 md:px-12 xl:px-0 py-10 lg:py-0"
            >
              {/* Title */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                  <TextType 
                    text={t.futureDeviceTitle} 
                    className="block min-h-[1.2em]" 
                    speed={80}
                  />
                </h2>
                <p className="text-lg md:text-2xl text-somavedic-amber font-light tracking-widest uppercase">
                  {t.futureDeviceSubtitle}
                </p>
              </div>

              {/* Subscription Form */}
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">{t.emailPlaceholder}</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      disabled={isSubmitting || isSubmitted}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-[20px] px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-somavedic-amber/50 focus:border-somavedic-amber/30 transition-all text-center lg:text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      aria-label={t.emailPlaceholder}
                    />
                  </div>
                  
                  {errorMessage && (
                    <p className="w-full text-center lg:text-left text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                      {errorMessage}
                    </p>
                  )}

                  <StarBorder 
                    as="button" 
                    type="submit" 
                    disabled={isSubmitting || isSubmitted}
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).umami) {
                        (window as any).umami.track('click-notify-me');
                      }
                    }}
                    color="#e137e1" 
                    speed="3s"
                    className={cn(
                      "w-full transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
                      (isSubmitting || isSubmitted) && "opacity-80 cursor-not-allowed hover:scale-100"
                    )}
                  >
                    <span className="flex items-center justify-center gap-2 font-bold tracking-wide uppercase">
                      {isSubmitted ? (
                        <span className="text-green-400 flex items-center gap-2">
                          {t.formSuccess} <span className="text-xl">✓</span>
                        </span>
                      ) : isSubmitting ? (
                        t.formSubmitting
                      ) : (
                        <>
                          {t.notifyMe} <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </span>
                  </StarBorder>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Right side - Product Image (extends to edge) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:w-1/2 relative order-1 lg:order-2 lg:h-full lg:overflow-hidden"
          >
            {/* Mobile/Tablet: Natural size image */}
            <div className="lg:hidden w-full px-8">
              <Image 
                src="/somavedic-2025-future-unveil.png" 
                alt="Future Device"
                width={800}
                height={800}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Desktop: Fill positioned image */}
            <div className="hidden lg:block absolute inset-0">
              <Image 
                src="/somavedic-2025-future-unveil.png"
                alt="Future Device"
                fill
                priority
                sizes="50vw"
                className="object-contain object-left"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

