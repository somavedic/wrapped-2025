interface SomaedicLogoProps {
  className?: string;
}

export function SomaedicLogo({ className = "" }: SomaedicLogoProps) {
  return (
    <img 
      src="/somavedic-white-logo.svg"
      alt="Somavedic"
      className={`object-contain ${className}`}
    />
  );
}

