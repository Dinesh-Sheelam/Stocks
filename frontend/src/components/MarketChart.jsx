import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

const MarketChart = ({ data, rsi, sentiment }) => {
  return (
    <div className="lg:col-span-3 glass-panel p-6 rounded-xl relative">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-widest">Sentiment vs Price Overlay</h2>
          <h1 className="text-3xl font-bold tracking-tight">Equities Performance Index</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-primary font-bold uppercase">RSI (14)</span>
            <span className="text-lg font-bold">{rsi || '--'}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-accent-purple font-bold uppercase">Sentiment</span>
            <span className="text-lg font-bold text-accent-purple">{sentiment || '--'}</span>
          </div>
        </div>
      </div>
      <div className="relative h-[320px] w-full">
         {/* Decorative bars */}
        <div className="absolute left-0 top-0 h-full w-24 flex flex-col justify-between py-2 opacity-20 pointer-events-none z-0">
            <div className="h-4 bg-primary/40 w-[80%]"></div>
            <div className="h-4 bg-primary/40 w-[60%]"></div>
            <div className="h-4 bg-primary/40 w-[95%]"></div>
            <div className="h-4 bg-primary/40 w-[40%]"></div>
            <div className="h-4 bg-primary/40 w-[70%]"></div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#137fec" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip
                contentStyle={{backgroundColor: '#0a0b1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                itemStyle={{color: '#fff'}}
            />
            <YAxis yAxisId="left" hide domain={['auto', 'auto']} />
            <YAxis yAxisId="right" orientation="right" hide domain={[0, 100]} />
            <Area yAxisId="left" type="monotone" dataKey="price" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
            <Area yAxisId="right" type="monotone" dataKey="sentiment" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;
