import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarketChart from '../components/MarketChart';
import SentimentMatrix from '../components/SentimentMatrix';
import SectorHeatmap from '../components/SectorHeatmap';
import PortfolioEngine from '../components/PortfolioEngine';

const Dashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketRes, sectorsRes, sentimentRes] = await Promise.all([
            axios.get('/api/market-data'),
            axios.get('/api/sectors'),
            axios.get('/api/sentiment')
        ]);

        setMarketData(marketRes.data);
        setSectors(sectorsRes.data);
        setSentiment(sentimentRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <MarketChart
                data={marketData}
                rsi={sentiment?.rsi}
                sentiment={sentiment?.label}
            />
            <SentimentMatrix data={sentiment} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SectorHeatmap sectors={sectors} />
            <PortfolioEngine />
        </section>
    </>
  );
};

export default Dashboard;
