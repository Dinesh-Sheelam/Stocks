import React, { useState } from 'react';
import axios from 'axios';

const PortfolioEngine = () => {
  const [formData, setFormData] = useState({ ticker: '', entryDate: '', entryPrice: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const response = await axios.post('/api/analyze', {
            ticker: formData.ticker,
            entry_date: formData.entryDate,
            entry_price: parseFloat(formData.entryPrice)
        });
        setResult(response.data);
    } catch (error) {
        console.error("Error analyzing portfolio", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
    <div className="glass-panel p-6 rounded-xl flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold">Portfolio Analysis Engine</h3>
        <span className="material-symbols-outlined text-primary">terminal</span>
      </div>
      <div className="space-y-4 flex-1">
        <div>
          <label className="text-[10px] text-gray-400 uppercase font-bold">Ticker Symbol</label>
          <input
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 mt-1 text-sm focus:border-primary focus:ring-0 outline-none"
            placeholder="e.g. AAPL"
            type="text"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-gray-400 uppercase font-bold">Entry Date</label>
            <input
               name="entryDate"
               value={formData.entryDate}
               onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 mt-1 text-sm text-gray-400 focus:border-primary focus:ring-0 outline-none"
              type="date"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase font-bold">Entry Price</label>
            <input
               name="entryPrice"
               value={formData.entryPrice}
               onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 mt-1 text-sm focus:border-primary focus:ring-0 outline-none"
              placeholder="0.00"
              type="number"
            />
          </div>
        </div>
        <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-primary/20 border border-primary/40 text-primary font-bold rounded-lg hover:bg-primary/30 transition-all mt-4 disabled:opacity-50"
        >
            {loading ? 'Analyzing...' : 'Ingest Data & Analyze'}
        </button>
      </div>
    </div>

    {/* Result Panel (Predictive P&L Forecast) */}
    <div className="glass-panel p-6 rounded-xl border border-primary/20 relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 size-40 bg-primary/10 rounded-full blur-3xl"></div>
      <h3 className="font-bold mb-6">Predictive P&L Forecast</h3>
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <p className="text-xs text-gray-400">Return Analysis</p>
            {result ? (
                <p className={`text-2xl font-bold ${result.return_percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.return_percentage > 0 ? '+' : ''}{result.return_percentage}% (${result.price_diff})
                </p>
            ) : (
                <p className="text-2xl font-bold text-gray-500">--</p>
            )}
          </div>
          <span className="material-symbols-outlined text-green-400 text-3xl">trending_up</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Volatility Risk Profile</span>
            <span className="text-primary font-bold">MODERATE</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent-purple w-[65%]"></div>
          </div>
        </div>
        <div className="p-3 bg-accent-purple/5 border-l-2 border-accent-purple text-xs text-gray-300 leading-relaxed italic">
            "Forecast incorporates current institutional accumulation and -12% expected sector volatility."
        </div>
      </div>
    </div>
    </>
  );
};

export default PortfolioEngine;
