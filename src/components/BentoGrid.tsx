import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto p-4 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  badge?: string;
}

export const BentoCard = ({
  children,
  className,
  title,
  description,
  badge,
}: BentoCardProps) => {
  return (
    <div
      className={cn(
        "glass glass-hover rounded-3xl p-6 flex flex-col overflow-hidden relative min-h-[200px]",
        className
      )}
    >
      {badge && (
        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-4 bg-white/5 py-1 px-3 rounded-full self-start">
          {badge}
        </span>
      )}
      <div className="flex-1">{children}</div>
      {(title || description) && (
        <div className="mt-4">
          {title && <h3 className="text-xl font-medium text-white/90">{title}</h3>}
          {description && (
            <p className="text-sm text-white/50 mt-1 max-w-[250px]">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
