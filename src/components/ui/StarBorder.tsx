"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StarBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
}

export const StarBorder = ({
  children,
  as: Component = "button",
  className,
  color = "white",
  speed = "6s",
  ...props
}: StarBorderProps) => {
  return (
    <Component
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[20px]",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 w-[300%] h-[100%] opacity-70 animate-star-movement -z-10"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-10 bg-black/90 border border-white/10 text-white rounded-[20px] px-8 py-3 ring-1 ring-white/5", 
        "backdrop-blur-xl transition-all duration-300 hover:bg-black/80"
      )}>
        {children}
      </div>
    </Component>
  );
};
