"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export interface TextTypeProps {
  text: string;
  className?: string;
  cursorChar?: string;
  speed?: number;
}

export function TextType({
  text,
  className,
  cursorChar = "|",
  speed = 50,
}: TextTypeProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const NOTE_TEXT = useTransform(rounded, (latest) => text.slice(0, latest));
  const [displayText, setDisplayText] = useState("");
  
  // Update state to trigger re-renders since standard useTransform doesn't work directly on text content
  useEffect(() => {
    return NOTE_TEXT.on("change", (latest) => {
      setDisplayText(latest);
    });
  }, [NOTE_TEXT]);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * (speed / 1000),
      ease: "linear",
    });
    return controls.stop;
  }, [count, text.length, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="inline-block ml-1 text-somavedic-amber"
      >
        {cursorChar}
      </motion.span>
    </span>
  );
}
