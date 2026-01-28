from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
try:
    from backend.finance import get_market_data, get_sector_performance, get_sentiment_analysis, analyze_portfolio
except ImportError:
    from finance import get_market_data, get_sector_performance, get_sentiment_analysis, analyze_portfolio

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for now, tighten for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PortfolioRequest(BaseModel):
    ticker: str
    entry_date: str
    entry_price: float

@app.get("/api/market-data")
def market_data(ticker: str = "SPY", period: str = "1mo"):
    data = get_market_data(ticker, period)
    return data

@app.get("/api/sectors")
def sectors():
    return get_sector_performance()

@app.get("/api/sentiment")
def sentiment():
    return get_sentiment_analysis()

@app.post("/api/analyze")
def analyze(request: PortfolioRequest):
    result = analyze_portfolio(request.ticker, request.entry_date, request.entry_price)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.get("/")
def read_root():
    return {"status": "ok", "service": "Finance API"}
