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
        className="absolute left-[50%] top-[50%] w-[600%] aspect-square opacity-70 animate-star-movement z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${color} 360deg)`,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-10 bg-[#af2caf] border border-white/10 text-white rounded-[20px] px-6 py-4 ring-1 ring-white/5", 
        "backdrop-blur-xl transition-all duration-300"
      )}>
        {children}
      </div>
    </Component>
  );
};
