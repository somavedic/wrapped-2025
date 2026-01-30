"use client";

import React from "react";
import { RegionCode } from "@/lib/locales";

interface FlagIconProps {
  regionCode: RegionCode;
  className?: string;
}

// SVG flag icons that work on all platforms (Windows, macOS, Linux, mobile)
const FLAGS: Record<RegionCode, React.ReactNode> = {
  'US-CA': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <path fill="#bd3d44" d="M0 0h640v480H0" />
      <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 202.7h640M0 276.3h640M0 350h640M0 423.7h640" />
      <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
      <marker id="a" markerHeight="30" markerWidth="30">
        <path fill="#fff" d="M14 0l9 27L0 10h28L5 27z" />
      </marker>
      <path fill="none" markerStart="url(#a)" d="M18.8 18.8h326.9v220.9H18.8z" />
    </svg>
  ),
  'SG': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <path fill="#fff" d="M0 0h640v240H0z" />
      <path fill="#df0000" d="M0 240h640v240H0z" />
      <path fill="#fff" d="M127.5 78.6l-16.8 51.5 44-32h-54.4l44 32z" />
    </svg>
  ),
  'EU': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <rect width="640" height="480" fill="#003399" />
      <g fill="#ffcc00">
        {/* 12 stars in a circle */}
        <polygon points="320,60 325,75 340,75 328,85 333,100 320,90 307,100 312,85 300,75 315,75" />
        <polygon points="445,98 450,113 465,113 453,123 458,138 445,128 432,138 437,123 425,113 440,113" />
        <polygon points="515,185 520,200 535,200 523,210 528,225 515,215 502,225 507,210 495,200 510,200" />
        <polygon points="515,295 520,310 535,310 523,320 528,335 515,325 502,335 507,320 495,310 510,310" />
        <polygon points="445,382 450,397 465,397 453,407 458,422 445,412 432,422 437,407 425,397 440,397" />
        <polygon points="320,420 325,435 340,435 328,445 333,460 320,450 307,460 312,445 300,435 315,435" />
        <polygon points="195,382 200,397 215,397 203,407 208,422 195,412 182,422 187,407 175,397 190,397" />
        <polygon points="125,295 130,310 145,310 133,320 138,335 125,325 112,335 117,320 105,310 120,310" />
        <polygon points="125,185 130,200 145,200 133,210 138,225 125,215 112,225 117,210 105,200 120,200" />
        <polygon points="195,98 200,113 215,113 203,123 208,138 195,128 182,138 187,123 175,113 190,113" />
        <polygon points="260,70 265,85 280,85 268,95 273,110 260,100 247,110 252,95 240,85 255,85" />
        <polygon points="380,70 385,85 400,85 388,95 393,110 380,100 367,110 372,95 360,85 375,85" />
      </g>
    </svg>
  ),
  'UK': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <rect width="640" height="480" fill="#012169" />
      {/* White diagonals */}
      <path d="M0 0L640 480M640 0L0 480" stroke="#fff" strokeWidth="96" />
      {/* Red diagonals */}
      <path d="M0 0L640 480M640 0L0 480" stroke="#c8102e" strokeWidth="64" />
      {/* White cross */}
      <path d="M320 0v480M0 240h640" stroke="#fff" strokeWidth="160" />
      {/* Red cross */}
      <path d="M320 0v480M0 240h640" stroke="#c8102e" strokeWidth="96" />
    </svg>
  ),
  'DE': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <path fill="#ffce00" d="M0 320h640v160H0z" />
      <path d="M0 0h640v160H0z" />
      <path fill="#d00" d="M0 160h640v160H0z" />
    </svg>
  ),
  'CH': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <path fill="#da291c" d="M0 0h640v480H0z" />
      <path fill="#fff" d="M240 140h80v200h-80z" />
      <path fill="#fff" d="M180 200h200v80H180z" />
    </svg>
  ),
  'AT': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <path fill="#ed2939" d="M0 0h640v160H0z" />
      <path fill="#fff" d="M0 160h640v160H0z" />
      <path fill="#ed2939" d="M0 320h640v160H0z" />
    </svg>
  ),
  'CZ': (
    <svg viewBox="0 0 640 480" className="w-full h-full">
      <path fill="#fff" d="M0 0h640v240H0z" />
      <path fill="#d7141a" d="M0 240h640v240H0z" />
      <path fill="#11457e" d="M0 0l320 240L0 480z" />
    </svg>
  ),
};

export function FlagIcon({ regionCode, className = "w-5 h-5 rounded overflow-hidden flex-shrink-0" }: FlagIconProps) {
  return (
    <span className={className} role="img" aria-hidden="true">
      {FLAGS[regionCode]}
    </span>
  );
}
