import { BentoCard } from "./BentoGrid";


interface VisitorStatsProps {
  totalUnitsSold: number;
  totalCustomers: number;
}

export const VisitorStats = ({ totalUnitsSold, totalCustomers }: VisitorStatsProps) => {
  const sqFtProtected = totalUnitsSold * 2800;
  const gallonsStructured = totalUnitsSold * 480;

  return (
    <BentoCard
      badge="Somavedic Impact"
      className="bg-gradient-to-tr from-emerald-500/10 to-transparent"
    >
      <div className="space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {(sqFtProtected / 1000000).toFixed(1)}M+
        </h3>
        <p className="text-md text-white/60 font-medium">Sq. Ft. Protected in 2025</p>
        <p className="text-[10px] text-white/20 mt-1">*Est. based on avg 2,800 sq. ft. coverage</p>
      </div>

      <div className="mt-8 space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {(gallonsStructured / 1000).toFixed(0)}k <span className="text-2xl text-white/20">Gal</span>
        </h3>
        <p className="text-md text-white/60 font-medium">Water Structured in 2025</p>
        <p className="text-[10px] text-white/20 mt-1">*Est. based on 5L daily usage per unit</p>
      </div>

      <div className="mt-8 space-y-1">
        <h3 className="text-4xl font-bold tracking-tighter text-white">
          {totalCustomers.toLocaleString()}
        </h3>
        <p className="text-md text-white/60 font-medium">People Sleeping Better in 2025</p>
        <p className="text-[10px] text-white/20 mt-1">*Based on new customers joined</p>
      </div>
    </BentoCard>
  );
};
