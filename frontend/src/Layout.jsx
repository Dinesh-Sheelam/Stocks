import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden font-display text-white bg-background-dark">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto relative pb-20">
        <Header />
        <div className="p-8 space-y-8">
            {children}
        </div>
        <footer className="fixed bottom-0 left-0 right-0 h-12 glass-panel border-t border-glass-border flex items-center overflow-hidden z-50">
            <div className="flex items-center px-6 bg-primary h-full z-10 font-bold text-[10px] uppercase tracking-tighter shrink-0">
                Live Analysis Feed
            </div>
            <div className="flex animate-marquee whitespace-nowrap items-center text-gray-300">
                <span className="flex items-center px-4 gap-2 text-xs font-bold border-r border-glass-border">
                    <span className="text-primary">SENTIMENT:</span> NASDAQ 100 <span className="text-green-400">BULLISH</span>
                </span>
                <span className="flex items-center px-4 gap-2 text-xs font-bold border-r border-glass-border">
                    <span className="text-primary">SENTIMENT:</span> CRUDE OIL <span className="text-red-400">NEUTRAL-BEARISH</span>
                </span>
                <span className="flex items-center px-4 gap-2 text-xs font-bold border-r border-glass-border">
                    <span className="text-primary">SENTIMENT:</span> BTC <span className="text-green-400">EXTREME GREED</span>
                </span>
                <span className="flex items-center px-4 gap-2 text-xs font-bold border-r border-glass-border">
                    <span className="text-primary">VOLATILITY:</span> VIX <span className="text-gray-400">STABLE</span>
                </span>
                 <span className="flex items-center px-4 gap-2 text-xs font-bold border-r border-glass-border">
                    <span className="text-primary">FLOW:</span> RETAIL <span className="text-green-400">ACCUMULATING</span>
                </span>
            </div>
        </footer>
      </main>
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Layout;
