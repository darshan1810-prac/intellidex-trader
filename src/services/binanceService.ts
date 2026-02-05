import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const BINANCE_API = 'https://api.binance.com/api/v3';
const BINANCE_WS = 'wss://stream.binance.com:9443/ws';

// Use edge function proxy to avoid CORS issues
const getProxyUrl = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/functions/v1/binance-proxy`;
};

export interface TickerStats {
  symbol: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  quoteVolume24h?: number;
  timestamp?: number;
}

export interface KlineData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type BinanceSymbol = 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT' | 'BNBUSDT' | 'XRPUSDT' | 'ADAUSDT';

export const SUPPORTED_SYMBOLS: { id: BinanceSymbol; name: string; symbol: string }[] = [
  { id: 'BTCUSDT', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ETHUSDT', name: 'Ethereum', symbol: 'ETH' },
  { id: 'SOLUSDT', name: 'Solana', symbol: 'SOL' },
  { id: 'BNBUSDT', name: 'BNB', symbol: 'BNB' },
  { id: 'XRPUSDT', name: 'XRP', symbol: 'XRP' },
  { id: 'ADAUSDT', name: 'Cardano', symbol: 'ADA' },
];

class BinanceService {
  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  // Get current ticker price
  async getCurrentPrice(symbol: BinanceSymbol = 'BTCUSDT'): Promise<number | null> {
    // Use mock data directly since Binance API is geo-blocked
    return this.getMockPrice(symbol);
  }

  // Mock price for when APIs fail
  private getMockPrice(symbol: BinanceSymbol): number {
    const basePrices: Record<BinanceSymbol, number> = {
      BTCUSDT: 69500,
      ETHUSDT: 3450,
      SOLUSDT: 145,
      BNBUSDT: 580,
      XRPUSDT: 0.52,
      ADAUSDT: 0.45
    };
    // Add some randomness
    const base = basePrices[symbol] || 100;
    return base * (1 + (Math.random() - 0.5) * 0.02);
  }

  // Get 24h ticker stats
  async get24hStats(symbol: BinanceSymbol = 'BTCUSDT'): Promise<TickerStats | null> {
    // Use mock stats since Binance API is geo-blocked
    const price = this.getMockPrice(symbol);
    const change = (Math.random() - 0.5) * 5;
    return {
      symbol,
      currentPrice: price,
      change24h: price * (change / 100),
      changePercent24h: change,
      high24h: price * 1.03,
      low24h: price * 0.97,
      volume24h: 50000 + Math.random() * 10000
    };
  }

  // Get historical candlestick data
  async getKlines(symbol: BinanceSymbol = 'BTCUSDT', interval: string = '1h', limit: number = 100): Promise<KlineData[]> {
    // Use mock klines since Binance API is geo-blocked
    return this.getMockKlines(symbol, limit);
  }

  // Generate mock klines for development
  private getMockKlines(symbol: BinanceSymbol, limit: number): KlineData[] {
    const klines: KlineData[] = [];
    let basePrice = this.getMockPrice(symbol);
    const now = Date.now();
    
    for (let i = limit - 1; i >= 0; i--) {
      const change = (Math.random() - 0.5) * 0.02;
      const open = basePrice;
      const close = basePrice * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      
      klines.push({
        timestamp: now - i * 3600000, // 1 hour intervals
        open,
        high,
        low,
        close,
        volume: 100 + Math.random() * 500
      });
      
      basePrice = close;
    }
    
    return klines;
  }

  // Connect to WebSocket for real-time updates
  connectWebSocket(symbol: BinanceSymbol = 'BTCUSDT', callback: (data: TickerStats) => void): void {
    if (this.ws) {
      this.disconnect();
    }

    const stream = `${symbol.toLowerCase()}@ticker`;
    this.ws = new WebSocket(`${BINANCE_WS}/${stream}`);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const tickerData: TickerStats = {
        symbol: data.s,
        currentPrice: parseFloat(data.c),
        change24h: parseFloat(data.p),
        changePercent24h: parseFloat(data.P),
        high24h: parseFloat(data.h),
        low24h: parseFloat(data.l),
        volume24h: parseFloat(data.v),
        timestamp: data.E
      };
      callback(tickerData);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Auto-reconnect after 5 seconds
      this.reconnectTimeout = setTimeout(() => this.connectWebSocket(symbol, callback), 5000);
    };
  }

  // Disconnect WebSocket
  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Calculate simple moving average
  calculateSMA(data: KlineData[], period: number): { timestamp: number; value: number }[] {
    const values = data.map(d => d.close);
    const result: { timestamp: number; value: number }[] = [];
    
    for (let i = period - 1; i < values.length; i++) {
      const sum = values.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push({
        timestamp: data[i].timestamp,
        value: sum / period
      });
    }
    
    return result;
  }

  // Calculate RSI
  calculateRSI(data: KlineData[], period: number = 14): number {
    const closes = data.map(d => d.close);
    
    if (closes.length < period + 1) {
      return 50; // Default neutral RSI
    }

    let gains = 0;
    let losses = 0;

    // Initial average gain/loss
    for (let i = 1; i <= period; i++) {
      const difference = closes[i] - closes[i - 1];
      if (difference >= 0) {
        gains += difference;
      } else {
        losses -= difference;
      }
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;
    
    if (avgLoss === 0) return 100;
    
    const rsi = [100 - (100 / (1 + avgGain / avgLoss))];

    // Calculate RSI for remaining data
    for (let i = period + 1; i < closes.length; i++) {
      const difference = closes[i] - closes[i - 1];
      
      if (difference >= 0) {
        avgGain = (avgGain * (period - 1) + difference) / period;
        avgLoss = (avgLoss * (period - 1)) / period;
      } else {
        avgGain = (avgGain * (period - 1)) / period;
        avgLoss = (avgLoss * (period - 1) - difference) / period;
      }

      if (avgLoss === 0) {
        rsi.push(100);
      } else {
        rsi.push(100 - (100 / (1 + avgGain / avgLoss)));
      }
    }

    return rsi[rsi.length - 1]; // Return latest RSI
  }

  // Calculate MACD
  calculateMACD(data: KlineData[]): number {
    const closes = data.map(d => d.close);
    
    if (closes.length < 26) {
      return 0; // Not enough data
    }
    
    // Simple MACD calculation (12, 26, 9)
    const ema12 = this.calculateEMA(closes, 12);
    const ema26 = this.calculateEMA(closes, 26);
    const macdLine = ema12 - ema26;
    
    return macdLine;
  }

  // Calculate EMA helper
  private calculateEMA(data: number[], period: number): number {
    const k = 2 / (period + 1);
    let ema = data[0];
    
    for (let i = 1; i < data.length; i++) {
      ema = data[i] * k + ema * (1 - k);
    }
    
    return ema;
  }
}

export const binanceService = new BinanceService();
export default binanceService;
