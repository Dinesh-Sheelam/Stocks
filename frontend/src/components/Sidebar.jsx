import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-20 lg:w-64 flex flex-col glass-panel border-r border-glass-border h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-gradient-to-br from-primary to-accent-purple rounded-lg flex items-center justify-center glow-blue">
          <span className="material-symbols-outlined text-white">analytics</span>
        </div>
        <div className="hidden lg:block">
          <h2 className="font-bold text-lg tracking-tight">ANALYZER</h2>
          <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Core Engine v4.0</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <a className="flex items-center gap-4 px-4 py-3 rounded-lg bg-primary/20 border border-primary/30 text-primary" href="#">
          <span className="material-symbols-outlined">query_stats</span>
          <span className="hidden lg:block font-medium">Market Analysis</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 transition-colors" href="#">
          <span className="material-symbols-outlined">neurology</span>
          <span className="hidden lg:block font-medium">Sentiment Hub</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 transition-colors" href="#">
          <span className="material-symbols-outlined">architecture</span>
          <span className="hidden lg:block font-medium">Analysis Engine</span>
        </a>
        <a className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 transition-colors" href="#">
          <span className="material-symbols-outlined">batch_prediction</span>
          <span className="hidden lg:block font-medium">Projections</span>
        </a>
      </nav>
      <div className="p-4 border-t border-glass-border">
        <div className="hidden lg:block px-4 py-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20 mb-4">
          <p className="text-[10px] text-accent-purple font-bold mb-1 uppercase tracking-wider">Analysis Status</p>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-medium">Scanning Markets...</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-gray-400 cursor-pointer hover:text-white transition-colors">
          <span className="material-symbols-outlined">settings</span>
          <span className="hidden lg:block text-sm font-medium">Global Config</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
