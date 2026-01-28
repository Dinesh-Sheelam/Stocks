import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 glass-panel border-b border-glass-border">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
          <input
            className="w-full bg-white/5 border-none rounded-lg pl-12 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary/50 text-white placeholder:text-gray-500 outline-none"
            placeholder="Analyze ticker, sector or sentiment signal..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
          <span className="hidden md:block">Market Phase: Greed</span>
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
        </div>
        <div
          className="size-10 rounded-full bg-center bg-cover border border-primary/50 glow-blue"
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDU7w3fQTEA3TE8hp2p-FLHXoQVDT9ZszK4WSlxuV6ucWzp6F1Hm877Vvmdfi5chaFYpz4QnrSPUUfFkwJ6vtusgP3Te4VbEy6ifdpCWB2kQkbuJF_WGuAKY4rqwDQI-LZhOGzA2wjd5h6I7PzOUnNZ3z66gEsSWSsk1MbJ1aYFSCYFQ99W_4Kjet66055VIO4Zf_Teizbq8Xdw1Un36hG4XeDurWUvvfmWmFdp56TUOd9g6MQTyezjxGSQAYNqV4QTligjiXGwsACD")'}}
        ></div>
      </div>
    </header>
  );
};

export default Header;
