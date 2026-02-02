// Mock data for IntelliDex trading platform

export const currentPrice = {
  price: 52347.82,
  change24h: 2.34,
  high24h: 53120.00,
  low24h: 51200.00,
  volume24h: 28.5,
  marketCap: 1.02,
};

export const latestPrediction = {
  horizon: "1 hour",
  predictedPrice: 52680,
  confidence: 81,
  sentiment: "BULLISH",
  change: 0.64,
};

export const activePositions = {
  count: 3,
  totalPnL: 2847.32,
  winRate: 67.5,
};

export const systemHealth = {
  dataCollection: "active",
  lastModelUpdate: "2 hours ago",
  accuracy: 78.3,
  uptime: 99.9,
};

export const predictions = [
  { horizon: "15 minutes", predictedPrice: 52450, change: 103, changePercent: 0.20, confidence: 87, direction: "up", sentimentImpact: 0.15 },
  { horizon: "1 hour", predictedPrice: 52680, change: 333, changePercent: 0.64, confidence: 81, direction: "up", sentimentImpact: 0.31 },
  { horizon: "4 hours", predictedPrice: 53100, change: 753, changePercent: 1.44, confidence: 74, direction: "up", sentimentImpact: 0.52 },
  { horizon: "12 hours", predictedPrice: 53850, change: 1503, changePercent: 2.87, confidence: 68, direction: "up", sentimentImpact: 0.74 },
  { horizon: "24 hours", predictedPrice: 54200, change: 1853, changePercent: 3.54, confidence: 65, direction: "up", sentimentImpact: 0.88 },
  { horizon: "3 days", predictedPrice: 55800, change: 3453, changePercent: 6.60, confidence: 58, direction: "up", sentimentImpact: 1.23 },
  { horizon: "7 days", predictedPrice: 56800, change: 4453, changePercent: 8.51, confidence: 52, direction: "up", sentimentImpact: 1.45 },
];

export const recentPredictions = [
  { time: "12:45 PM", horizon: "1H", price: 52680, confidence: 81 },
  { time: "12:30 PM", horizon: "4H", price: 53100, confidence: 74 },
  { time: "12:15 PM", horizon: "24H", price: 54200, confidence: 65 },
  { time: "12:00 PM", horizon: "1H", price: 52450, confidence: 85 },
  { time: "11:45 AM", horizon: "15M", price: 52380, confidence: 89 },
];

export const sentimentData = {
  score: 0.65,
  label: "BULLISH",
  trend: "rising",
  newsVolume: 247,
  topHeadlines: [
    "Bitcoin breaks $52K as institutional buying increases",
    "ETF inflows reach new weekly high of $1.2B",
    "Technical analysis suggests breakout imminent",
  ],
};

export const modelPerformance = {
  mae: 124.5,
  mape: 0.24,
  directionAccuracy: 78.3,
  last30Days: [
    { day: 1, accuracy: 75 }, { day: 2, accuracy: 78 }, { day: 3, accuracy: 72 },
    { day: 4, accuracy: 80 }, { day: 5, accuracy: 82 }, { day: 6, accuracy: 79 },
    { day: 7, accuracy: 77 }, { day: 8, accuracy: 81 }, { day: 9, accuracy: 83 },
    { day: 10, accuracy: 78 }, { day: 11, accuracy: 76 }, { day: 12, accuracy: 79 },
    { day: 13, accuracy: 82 }, { day: 14, accuracy: 80 }, { day: 15, accuracy: 78 },
  ],
};

export const priceHistory = Array.from({ length: 100 }, (_, i) => {
  const basePrice = 51000 + Math.random() * 2000;
  const open = basePrice + (Math.random() - 0.5) * 200;
  const close = basePrice + (Math.random() - 0.5) * 200;
  const high = Math.max(open, close) + Math.random() * 100;
  const low = Math.min(open, close) - Math.random() * 100;
  const volume = 500 + Math.random() * 1000;
  
  return {
    time: new Date(Date.now() - (100 - i) * 3600000).toISOString(),
    open,
    high,
    low,
    close,
    volume,
  };
});

export const tradingPositions = [
  { id: 1, type: "LONG", entry: 51200, current: 52347, amount: 0.5, pnl: 573.50, pnlPercent: 2.24 },
  { id: 2, type: "LONG", entry: 50800, current: 52347, amount: 0.25, pnl: 386.75, pnlPercent: 3.05 },
  { id: 3, type: "SHORT", entry: 53000, current: 52347, amount: 0.15, pnl: 97.95, pnlPercent: 1.23 },
];

export const recentTrades = [
  { time: "12:32 PM", side: "BUY", amount: 0.15, price: 52280, pnl: 10.05 },
  { id: 2, time: "11:45 AM", side: "SELL", amount: 0.25, price: 52150, pnl: -12.50 },
  { time: "10:15 AM", side: "BUY", amount: 0.50, price: 51800, pnl: 273.50 },
  { time: "09:30 AM", side: "SELL", amount: 0.10, price: 51650, pnl: 45.00 },
  { time: "08:45 AM", side: "BUY", amount: 0.35, price: 51500, pnl: 296.45 },
];

export const securityAlerts = {
  critical: 2,
  high: 5,
  medium: 12,
  safe: 847,
};

export const transactions = [
  { hash: "0x7a8f...3b2c", type: "Transfer", amount: 2.5, riskScore: 12, status: "safe", timestamp: "12:45 PM" },
  { hash: "0x9c4e...8d1a", type: "Swap", amount: 15.2, riskScore: 45, status: "medium", timestamp: "12:32 PM" },
  { hash: "0x3f2b...7e9c", type: "Bridge", amount: 50.0, riskScore: 78, status: "high", timestamp: "12:15 PM" },
  { hash: "0x1d8a...4f6b", type: "Transfer", amount: 0.8, riskScore: 8, status: "safe", timestamp: "11:58 AM" },
  { hash: "0x5e7c...2a9d", type: "Contract", amount: 125.0, riskScore: 92, status: "critical", timestamp: "11:42 AM" },
];

export const newsItems = [
  {
    id: 1,
    headline: "Bitcoin ETF Inflows Hit Record $1.2B in Single Day",
    source: "CoinDesk",
    timestamp: "15 minutes ago",
    sentiment: "bullish",
    relevance: 95,
    summary: "Institutional investors continue to pour capital into Bitcoin ETFs, with BlackRock's IBIT leading the charge with over $500M in daily inflows.",
    tags: ["ETF", "Institutional", "BlackRock"],
  },
  {
    id: 2,
    headline: "Federal Reserve Signals Potential Rate Cuts in Q2",
    source: "Bloomberg",
    timestamp: "45 minutes ago",
    sentiment: "bullish",
    relevance: 88,
    summary: "Fed officials hint at possible monetary policy easing, which historically correlates with risk-on asset appreciation including cryptocurrencies.",
    tags: ["Fed", "Macro", "Interest Rates"],
  },
  {
    id: 3,
    headline: "Bitcoin Mining Difficulty Reaches All-Time High",
    source: "The Block",
    timestamp: "2 hours ago",
    sentiment: "neutral",
    relevance: 72,
    summary: "Network security strengthens as mining difficulty adjustment brings increased computational requirements for block validation.",
    tags: ["Mining", "Network", "Security"],
  },
];

export const systemStatus = {
  dataCollector: { status: "active", cpu: 12, memory: 256, uptime: "14d 6h" },
  modelUpdater: { status: "idle", cpu: 0, memory: 128, uptime: "14d 6h" },
  performanceTracker: { status: "active", cpu: 5, memory: 64, uptime: "14d 6h" },
  blockchainLogger: { status: "active", cpu: 3, memory: 48, uptime: "14d 6h" },
  securityMonitor: { status: "active", cpu: 8, memory: 192, uptime: "14d 6h" },
};

export const apiStatus = {
  kraken: { status: "operational", latency: 45 },
  alphaVantage: { status: "operational", latency: 120 },
  blockchain: { status: "operational", latency: 230 },
  ipfs: { status: "degraded", latency: 890 },
};
