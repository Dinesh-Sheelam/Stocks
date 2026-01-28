import React from 'react';
import clsx from 'clsx';

const SectorHeatmap = ({ sectors }) => {
  return (
    <div className="glass-panel p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold">Sector Heat Map</h3>
        <span className="material-symbols-outlined text-gray-400">grid_view</span>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 h-64">
        {sectors && sectors.slice(0, 7).map((sector, index) => {
            const isPositive = sector.change >= 0;
            const isNeutral = sector.change === 0;
            const colorClass = isNeutral
                ? "bg-white/5 border-white/10 text-gray-400"
                : isPositive
                    ? "bg-green-600/40 border-green-400/30 text-green-400"
                    : "bg-red-600/40 border-red-400/30 text-red-400";

            // Hardcoded spans to match design reference roughly
            const spanClass = (index === 3 || index === 6) ? "col-span-2" : "";

            return (
                <div key={sector.name} className={clsx(colorClass, "border flex items-center justify-center flex-col p-2 rounded", spanClass)}>
                    <span className="text-xs font-bold text-white">{sector.name}</span>
                    <span className="text-[10px]">{sector.change > 0 ? '+' : ''}{sector.change}%</span>
                </div>
            )
        })}
        {(!sectors || sectors.length === 0) && <div className="col-span-3 row-span-3 flex items-center justify-center text-gray-500 text-xs">Loading sectors...</div>}
      </div>
    </div>
  );
};

export default SectorHeatmap;
