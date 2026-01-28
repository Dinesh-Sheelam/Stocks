import React from 'react';

const SentimentMatrix = ({ data }) => {
  const { fear_greed_index, label, institutional_flow, volatility, signal } = data || {};

  return (
    <div className="glass-panel p-6 rounded-xl border border-accent-purple/30 glow-purple space-y-8">
      <h3 className="font-bold text-lg border-b border-glass-border pb-3">Sentiment Matrix</h3>
      <div className="text-center relative">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Fear / Greed Index</p>
        <div className="w-32 h-16 mx-auto relative overflow-hidden">
             {/* Gauge Background */}
            <div className="w-full h-full rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-80"></div>
            {/* Needle */}
            <div
                className="absolute bottom-0 left-1/2 w-1 h-full bg-white origin-bottom transition-transform duration-500"
                style={{ transform: `translateX(-50%) rotate(${(fear_greed_index ? (fear_greed_index / 100) * 180 - 90 : 0)}deg)` }}
            ></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-4 bg-background-dark border-2 border-white rounded-full"></div>
        </div>
        <p className="mt-2 text-xl font-bold text-green-400">{fear_greed_index || '--'} <span className="text-xs uppercase ml-1">{label || 'Neutral'}</span></p>
      </div>
      <div className="space-y-4">
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-gray-400 uppercase">Institutional Flow</span>
            <span className="text-xs text-green-400 font-bold">{institutional_flow || '--'}</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[75%]"></div>
          </div>
        </div>
        <div className="bg-black/20 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-gray-400 uppercase">Volatility (VIX)</span>
            <span className="text-xs text-red-400 font-bold">{volatility || '--'}</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-accent-purple w-[30%]"></div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
        <p className="text-[10px] text-primary font-bold uppercase mb-2">Matrix Signal</p>
        <p className="text-xs text-gray-400 italic">{signal || 'Loading data...'}</p>
      </div>
    </div>
  );
};

export default SentimentMatrix;
