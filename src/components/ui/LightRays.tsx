"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface LightRaysProps {
  className?: string;
}

export const LightRays = ({ className }: LightRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      {/* Center light source */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-somavedic-amber/20 to-transparent blur-[100px] opacity-50" />
      
      {/* Moving rays */}
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] animate-spin-slow opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[50px] origin-left"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-50%)`,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,198,0,0.1) 20%, transparent 100%)",
              filter: "blur(20px)",
            }}
          />
        ))}
      </div>
       <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] animate-spin-reverse-slower opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[60px] origin-left"
            style={{
              transform: `rotate(${i * 60}deg) translateY(-50%)`,
               background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 100%)",
               filter: "blur(30px)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
