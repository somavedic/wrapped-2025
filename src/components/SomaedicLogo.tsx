import Image from "next/image";

interface SomaedicLogoProps {
  className?: string;
}

export function SomaedicLogo({ className = "" }: SomaedicLogoProps) {
  return (
    <Image 
      src="/somavedic-white-logo.svg"
      alt="Somavedic"
      width={120}
      height={32}
      priority
      className={`object-contain ${className}`}
    />
  );
}
