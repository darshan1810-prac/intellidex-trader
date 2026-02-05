import axios from 'axios';

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  url: string;
  votes?: {
    positive: number;
    negative: number;
  };
  sentiment?: number;
}

export interface SentimentAnalysis {
  score: number;
  label: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  newsVolume: number;
  topHeadlines: {
    title: string;
    source: string;
    sentiment: number;
    timestamp: string;
  }[];
}

class SentimentService {
  private cachedSentiment: number | null = null;
  private cacheExpiry: number | null = null;
  private cachedNews: NewsArticle[] = [];
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  private readonly bullishKeywords = [
    'surge', 'rally', 'breakout', 'bullish', 'moon', 'pump',
    'adoption', 'institutional', 'ath', 'high', 'buy', 'long',
    'support', 'upgrade', 'partnership', 'growth', 'profit',
    'soar', 'jump', 'gain', 'rise', 'positive', 'optimistic',
    'all-time high', 'etf', 'approval', 'milestone'
  ];

  private readonly bearishKeywords = [
    'crash', 'dump', 'bearish', 'decline', 'fall', 'drop',
    'regulatory', 'ban', 'selloff', 'fear', 'sell', 'short',
    'resistance', 'concern', 'risk', 'loss', 'scam', 'hack',
    'plunge', 'tumble', 'warning', 'negative', 'pessimistic',
    'investigation', 'lawsuit', 'fraud'
  ];

  // Keyword-based sentiment scoring
  analyzeSentiment(text: string): number {
    const lowerText = text.toLowerCase();
    let score = 0;

    // Count bullish keywords
    this.bullishKeywords.forEach(keyword => {
      const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
      score += matches * 0.15;
    });

    // Count bearish keywords
    this.bearishKeywords.forEach(keyword => {
      const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
      score -= matches * 0.15;
    });

    // Normalize to -1 to 1
    return Math.max(-1, Math.min(1, score));
  }

  // Fetch news from CryptoPanic API
  async fetchNews(): Promise<NewsArticle[]> {
    try {
      const apiKey = import.meta.env.VITE_CRYPTOPANIC_API_KEY || 'free';
      const response = await axios.get('https://cryptopanic.com/api/free/v1/posts/', {
        params: {
          auth_token: apiKey,
          currencies: 'BTC',
          filter: 'hot',
          public: 'true'
        },
        timeout: 10000
      });

      const articles = response.data.results.slice(0, 20).map((article: any) => ({
        id: article.id?.toString() || Math.random().toString(),
        title: article.title,
        source: article.source?.title || 'Unknown',
        timestamp: article.published_at,
        url: article.url,
        votes: article.votes
      }));

      this.cachedNews = articles;
      return articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      // Return cached news or fallback
      if (this.cachedNews.length > 0) {
        return this.cachedNews;
      }
      return this.getFallbackNews();
    }
  }

  // Fallback news (in case API fails)
  private getFallbackNews(): NewsArticle[] {
    const now = new Date();
    return [
      {
        id: '1',
        title: 'Bitcoin Maintains Strong Position as Market Stabilizes',
        source: 'CoinDesk',
        timestamp: now.toISOString(),
        url: '#'
      },
      {
        id: '2',
        title: 'Institutional Interest in Crypto Continues to Grow',
        source: 'Bloomberg',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        url: '#'
      },
      {
        id: '3',
        title: 'Major Exchange Reports Record Trading Volume',
        source: 'CoinTelegraph',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        url: '#'
      },
      {
        id: '4',
        title: 'Regulatory Clarity Expected to Boost Adoption',
        source: 'Reuters',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        url: '#'
      }
    ];
  }

  // Get overall sentiment score
  async getSentimentScore(): Promise<number> {
    // Use cache if available and not expired
    if (this.cachedSentiment !== null && this.cacheExpiry && this.cacheExpiry > Date.now()) {
      return this.cachedSentiment;
    }

    try {
      const news = await this.fetchNews();
      
      // Calculate weighted sentiment from news headlines
      let totalScore = 0;
      let totalWeight = 0;

      news.forEach((article) => {
        const sentiment = this.analyzeSentiment(article.title);
        const age = Date.now() - new Date(article.timestamp).getTime();
        
        // Recent news has more weight
        const weight = Math.exp(-age / (6 * 3600000)); // Decay over 6 hours
        
        totalScore += sentiment * weight;
        totalWeight += weight;
      });

      const sentimentScore = totalWeight > 0 ? totalScore / totalWeight : 0;

      // Cache the result
      this.cachedSentiment = sentimentScore;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;

      return sentimentScore;
    } catch (error) {
      console.error('Error calculating sentiment:', error);
      return this.cachedSentiment ?? 0; // Return cached or neutral
    }
  }

  // Get sentiment with full details
  async getSentimentAnalysis(): Promise<SentimentAnalysis> {
    const score = await this.getSentimentScore();
    const news = await this.fetchNews();

    return {
      score,
      label: score > 0.3 ? 'BULLISH' : score < -0.3 ? 'BEARISH' : 'NEUTRAL',
      confidence: Math.min(95, Math.abs(score) * 100 + 40),
      newsVolume: news.length,
      topHeadlines: news.slice(0, 5).map(article => ({
        title: article.title,
        source: article.source,
        sentiment: this.analyzeSentiment(article.title),
        timestamp: article.timestamp
      }))
    };
  }

  // Get all fetched news with sentiment
  async getNewsWithSentiment(): Promise<(NewsArticle & { sentiment: number })[]> {
    const news = await this.fetchNews();
    return news.map(article => ({
      ...article,
      sentiment: this.analyzeSentiment(article.title)
    }));
  }
}

export const sentimentService = new SentimentService();
export default sentimentService;
