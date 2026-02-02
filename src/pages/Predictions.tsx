import { TrendingUp, TrendingDown, Clock, Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SentimentGauge } from "@/components/shared/SentimentGauge";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart
} from "recharts";
import { predictions, currentPrice, sentimentData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Predictions() {
  // Generate chart data for prediction visualization
  const chartData = [
    { time: "Now", actual: currentPrice.price, label: "Current" },
    { time: "15m", pred15m: predictions[0].predictedPrice },
    { time: "1h", pred1h: predictions[1].predictedPrice },
    { time: "4h", pred4h: predictions[2].predictedPrice },
    { time: "12h", pred12h: predictions[3].predictedPrice },
    { time: "24h", pred24h: predictions[4].predictedPrice },
    { time: "3d", pred3d: predictions[5].predictedPrice },
    { time: "7d", pred7d: predictions[6].predictedPrice },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-fade-in max-w-[1800px] mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-4">
        <h1 className="text-4xl font-bold text-gradient-gold tracking-tight">AI-Powered Bitcoin Price Predictions</h1>
        <p className="text-muted-foreground text-lg">
          Unified Transformer Model with Sentiment Analysis
        </p>
        <p className="text-xs text-muted-foreground inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
          <span className="w-1.5 h-1.5 rounded-full bg-success pulse-live" />
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Current Market Status */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Price Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Current Price</h3>
              <PriceDisplay 
                price={currentPrice.price} 
                changePercent={currentPrice.change24h}
                change={currentPrice.price * (currentPrice.change24h / 100)}
                size="xl"
              />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">24h High:</span>
                  <span className="ml-2 font-mono text-success">${currentPrice.high24h.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">24h Low:</span>
                  <span className="ml-2 font-mono text-destructive">${currentPrice.low24h.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="ml-2 font-mono">${currentPrice.volume24h}B</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="ml-2 font-mono">${currentPrice.marketCap}T</span>
                </div>
              </div>
            </div>

            {/* Center: Sentiment */}
            <div className="flex flex-col items-center justify-center space-y-2 border-x border-border px-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Market Sentiment</h3>
              <SentimentGauge score={sentimentData.score} size="lg" />
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Momentum: <span className="text-success">+0.12</span></span>
                <span>News: {sentimentData.newsVolume}</span>
              </div>
            </div>

            {/* Right: Technical Indicators */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Technical Indicators</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">RSI (14)</span>
                    <span className="font-mono">62.5</span>
                  </div>
                  <Progress value={62.5} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MACD</span>
                  <span className="font-mono text-success">+124.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volume Trend</span>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    Above Average
                  </Badge>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Volatility</span>
                    <span className="font-mono">Medium</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Horizon Predictions Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Multi-Horizon Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Timeframe</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Predicted Price</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Change</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Change %</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Confidence</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Direction</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Sentiment Impact</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, index) => (
                  <tr 
                    key={index}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{pred.horizon}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono font-semibold text-lg">
                        ${pred.predictedPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={cn(
                        "font-mono",
                        pred.change > 0 ? "text-success" : "text-destructive"
                      )}>
                        {pred.change > 0 ? "+" : ""}${pred.change.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={cn(
                        "font-mono font-semibold",
                        pred.changePercent > 0 ? "text-success" : "text-destructive"
                      )}>
                        {pred.changePercent > 0 ? "+" : ""}{pred.changePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ConfidenceBadge confidence={pred.confidence} showLabel={false} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {pred.direction === "up" ? (
                          <TrendingUp className="w-5 h-5 text-success" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono text-primary">
                        +{pred.sentimentImpact.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Visualization Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Prediction Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend />
                
                {/* Current price point */}
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--foreground))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--foreground))', r: 6 }}
                  name="Current Price"
                />
                
                {/* Prediction lines */}
                <Line 
                  type="monotone" 
                  dataKey="pred15m" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  name="15min Prediction"
                />
                <Line 
                  type="monotone" 
                  dataKey="pred1h" 
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={{ fill: 'hsl(var(--success))', r: 4 }}
                  name="1h Prediction"
                />
                <Line 
                  type="monotone" 
                  dataKey="pred4h" 
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={{ fill: 'hsl(var(--warning))', r: 4 }}
                  name="4h Prediction"
                />
                <Line 
                  type="monotone" 
                  dataKey="pred24h" 
                  stroke="hsl(var(--chart-volume))"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={{ fill: 'hsl(var(--chart-volume))', r: 4 }}
                  name="24h Prediction"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Historical Predictions Log */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Historical Predictions Log</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search predictions..." 
                  className="pl-9 w-[200px]"
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Horizon</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Predicted</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actual</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Error</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Direction</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => {
                  const predicted = 52000 + Math.random() * 1000;
                  const actual = predicted + (Math.random() - 0.5) * 500;
                  const error = ((actual - predicted) / predicted * 100);
                  const directionCorrect = Math.random() > 0.3;
                  
                  return (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(Date.now() - index * 3600000).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{["1H", "4H", "24H", "1H", "12H"][index]}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        ${predicted.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        ${actual.toFixed(2)}
                      </td>
                      <td className={cn(
                        "py-3 px-4 text-right font-mono",
                        Math.abs(error) < 1 ? "text-success" : Math.abs(error) < 2 ? "text-warning" : "text-destructive"
                      )}>
                        {error > 0 ? "+" : ""}{error.toFixed(2)}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        {directionCorrect ? (
                          <Badge className="bg-success/20 text-success border-success/30">✓ Correct</Badge>
                        ) : (
                          <Badge className="bg-destructive/20 text-destructive border-destructive/30">✗ Wrong</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
