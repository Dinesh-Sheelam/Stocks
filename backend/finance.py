import yfinance as yf
import pandas as pd
import random
from datetime import datetime

def get_market_data(ticker="SPY", period="1mo", interval="1d"):
    """
    Fetches historical market data for the chart.
    Returns a list of dicts with date and close price.
    """
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period=period, interval=interval)

        # Calculate mock sentiment overlay (just for visualization)
        # In a real app, this would be derived from news/social media
        data = []
        for date, row in hist.iterrows():
            close_price = row['Close']
            # Create a mock sentiment score that vaguely correlates/leads price
            sentiment_score = 50 + (close_price % 10) * 5

            data.append({
                "date": date.strftime("%Y-%m-%d"),
                "price": float(round(close_price, 2)),
                "sentiment": float(round(sentiment_score, 1))
            })
        return data
    except Exception as e:
        print(f"Error fetching market data: {e}")
        return []

def get_sector_performance():
    """
    Fetches performance for major sector ETFs.
    """
    sector_etfs = {
        "TECH": "XLK",
        "FIN": "XLF",
        "ENERGY": "XLE",
        "HEALTH": "XLV",
        "CONSUMER": "XLY", # Discretionary
        "UTILITIES": "XLU",
        "COMM": "XLC",
        "INDUS": "XLI",
        "MAT": "XLB"
    }

    results = []

    # Batch fetch might be faster, but simple loop is safer for now
    # Or use yf.download
    tickers = " ".join(sector_etfs.values())
    try:
        # Fetch data for last 2 days to calculate % change
        data = yf.download(tickers, period="5d", progress=False)['Close']

        # Calculate percent change from previous close
        # Use iloc to get last two rows
        if len(data) >= 2:
            latest = data.iloc[-1]
            prev = data.iloc[-2]

            for sector, ticker in sector_etfs.items():
                if ticker in latest:
                    change = ((latest[ticker] - prev[ticker]) / prev[ticker]) * 100
                    results.append({
                        "name": sector,
                        "change": float(round(change, 2)),
                        "ticker": ticker
                    })
        else:
             # Fallback if data fetch fails
            for sector in sector_etfs:
                results.append({"name": sector, "change": 0.0, "ticker": sector_etfs[sector]})

    except Exception as e:
        print(f"Error fetching sector data: {e}")
        # Return mock data on error to prevent UI crash
        for sector in sector_etfs:
             results.append({"name": sector, "change": round(random.uniform(-2, 3), 2), "ticker": sector_etfs[sector]})

    return results

def get_sentiment_analysis():
    """
    Returns sentiment metrics.
    Real sentiment requires API keys (e.g. AlphaVantage, NewsAPI) or scraping.
    We will calculate technical indicators (RSI) as a proxy for 'Sentiment'.
    """
    try:
        spy = yf.Ticker("SPY")
        hist = spy.history(period="1mo")

        # Simple RSI calculation
        delta = hist['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()

        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        current_rsi = rsi.iloc[-1] if not rsi.empty else 50

        # Map RSI to Fear/Greed
        sentiment_label = "Neutral"
        if current_rsi > 70:
            sentiment_label = "Greed"
        elif current_rsi > 80:
             sentiment_label = "Extreme Greed"
        elif current_rsi < 30:
            sentiment_label = "Fear"
        elif current_rsi < 20:
            sentiment_label = "Extreme Fear"

        return {
            "fear_greed_index": int(current_rsi), # Using RSI as proxy
            "label": sentiment_label,
            "rsi": float(round(current_rsi, 1)),
            "institutional_flow": "+1.2B", # Mock
            "volatility": 14.28, # Mock or fetch VIX
            "signal": "Strong institutional support detected in tech sectors." # Mock
        }
    except Exception as e:
        print(f"Error calculating sentiment: {e}")
        return {
            "fear_greed_index": 50,
            "label": "Neutral",
            "rsi": 50.0,
            "institutional_flow": "0",
            "volatility": 0,
            "signal": "Data unavailable"
        }

def analyze_portfolio(ticker, entry_date, entry_price):
    """
    Calculates P&L for a position.
    """
    try:
        stock = yf.Ticker(ticker)
        # Get current price
        # fast_info is faster than history
        current_price = stock.fast_info['last_price']

        entry_price = float(entry_price)

        if entry_price <= 0:
            return {"error": "Invalid entry price"}

        percent_change = ((current_price - entry_price) / entry_price) * 100
        # Assume 100 shares for simple P&L absolute value example,
        # or just return the percent and price difference.
        # The UI shows "+$14,208.50" which implies a quantity.
        # We will return the percent return and price.

        return {
            "ticker": ticker.upper(),
            "current_price": float(round(current_price, 2)),
            "entry_price": float(entry_price),
            "return_percentage": float(round(percent_change, 2)),
            "price_diff": float(round(current_price - entry_price, 2))
        }

    except Exception as e:
        print(f"Error analyzing portfolio: {e}")
        return {"error": str(e)}
