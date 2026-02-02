import { useState } from "react";
import { TrendingUp, TrendingDown, Wallet, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PriceChart } from "@/components/charts/PriceChart";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { currentPrice, predictions, priceHistory, tradingPositions, recentTrades } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Trading() {
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("0.1");
  const [limitPrice, setLimitPrice] = useState("");
  const [isPaperTrading, setIsPaperTrading] = useState(true);
  const [selectedHorizon, setSelectedHorizon] = useState("1h");

  const selectedPrediction = predictions.find(p => 
    p.horizon.toLowerCase().includes(selectedHorizon)
  ) || predictions[1];

  const totalValue = parseFloat(amount || "0") * currentPrice.price;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header with trading mode toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trading</h1>
          <p className="text-muted-foreground text-sm">
            Execute trades based on AI predictions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={isPaperTrading} 
              onCheckedChange={setIsPaperTrading}
              id="trading-mode"
            />
            <Label htmlFor="trading-mode" className="text-sm">
              {isPaperTrading ? (
                <span className="text-warning">Paper Trading</span>
              ) : (
                <span className="text-success">Live Trading</span>
              )}
            </Label>
          </div>
          {isPaperTrading && (
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
              <Wallet className="w-3 h-3 mr-1" />
              Virtual Funds: $10,000
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Order Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">New Order</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="market" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-4">
                  <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
                  <TabsTrigger value="limit" className="text-xs">Limit</TabsTrigger>
                  <TabsTrigger value="prediction" className="text-xs">AI Pred.</TabsTrigger>
                </TabsList>

                <TabsContent value="market" className="space-y-4">
                  {/* Buy/Sell Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 font-semibold",
                        orderSide === "buy" && "bg-success text-success-foreground border-success hover:bg-success/90"
                      )}
                      onClick={() => setOrderSide("buy")}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      BUY
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 font-semibold",
                        orderSide === "sell" && "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90"
                      )}
                      onClick={() => setOrderSide("sell")}
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      SELL
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount (BTC)</Label>
                    <Input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="font-mono"
                    />
                    <div className="flex gap-2">
                      {["0.01", "0.1", "0.5", "1.0"].map((val) => (
                        <Button
                          key={val}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => setAmount(val)}
                        >
                          {val}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Price (Current)</Label>
                    <div className="p-3 rounded-lg bg-muted/50 font-mono text-lg">
                      ${currentPrice.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Total (USD)</Label>
                    <div className="p-3 rounded-lg bg-muted/50 font-mono text-lg font-semibold">
                      ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <Button 
                    className={cn(
                      "w-full h-12 text-lg font-semibold",
                      orderSide === "buy" 
                        ? "bg-success hover:bg-success/90 text-success-foreground" 
                        : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    )}
                  >
                    {orderSide === "buy" ? "Buy BTC" : "Sell BTC"}
                  </Button>
                </TabsContent>

                <TabsContent value="limit" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 font-semibold",
                        orderSide === "buy" && "bg-success text-success-foreground border-success"
                      )}
                      onClick={() => setOrderSide("buy")}
                    >
                      BUY
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 font-semibold",
                        orderSide === "sell" && "bg-destructive text-destructive-foreground border-destructive"
                      )}
                      onClick={() => setOrderSide("sell")}
                    >
                      SELL
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount (BTC)</Label>
                    <Input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Limit Price (USD)</Label>
                    <Input 
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      placeholder={currentPrice.price.toString()}
                      className="font-mono"
                    />
                  </div>

                  <Button 
                    className={cn(
                      "w-full h-12 font-semibold",
                      orderSide === "buy" 
                        ? "bg-success hover:bg-success/90" 
                        : "bg-destructive hover:bg-destructive/90"
                    )}
                  >
                    Place Limit Order
                  </Button>
                </TabsContent>

                <TabsContent value="prediction" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Prediction Horizon</Label>
                    <Select value={selectedHorizon} onValueChange={setSelectedHorizon}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 Minutes</SelectItem>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="4h">4 Hours</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="text-sm text-muted-foreground mb-1">Predicted Price</div>
                    <div className="text-2xl font-bold font-mono text-primary">
                      ${selectedPrediction.predictedPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-success">
                      +{selectedPrediction.changePercent}% • {selectedPrediction.confidence}% confidence
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount (BTC)</Label>
                    <Input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="font-mono"
                    />
                  </div>

                  <Button className="w-full h-12 font-semibold bg-primary hover:bg-primary/90">
                    Execute at Predicted Price
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Available Balance */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-muted-foreground">Available Balance</span>
                <Wallet className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USD</span>
                  <span className="font-mono font-semibold">$8,453.28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BTC</span>
                  <span className="font-mono font-semibold">0.3245 BTC</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Chart */}
        <div className="lg:col-span-2">
          <PriceChart data={priceHistory} />
        </div>

        {/* Right Column - Positions & History */}
        <div className="lg:col-span-1 space-y-4">
          {/* Active Positions */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Active Positions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tradingPositions.map((position) => (
                <div 
                  key={position.id}
                  className="p-3 rounded-lg bg-muted/30 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn(
                      position.type === "LONG" 
                        ? "bg-success/10 text-success border-success/30" 
                        : "bg-destructive/10 text-destructive border-destructive/30"
                    )}>
                      {position.type}
                    </Badge>
                    <span className="font-mono text-sm">{position.amount} BTC</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Entry: </span>
                      <span className="font-mono">${position.entry.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-mono">${position.current.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-mono font-semibold",
                      position.pnl >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)} ({position.pnlPercent}%)
                    </span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">
                      <X className="w-3 h-3 mr-1" />
                      Close
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentTrades.map((trade, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn(
                        "text-[10px]",
                        trade.side === "BUY" 
                          ? "bg-success/10 text-success border-success/30" 
                          : "bg-destructive/10 text-destructive border-destructive/30"
                      )}>
                        {trade.side}
                      </Badge>
                      <div className="text-xs">
                        <div className="font-mono">{trade.amount} BTC</div>
                        <div className="text-muted-foreground">{trade.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono">${trade.price.toLocaleString()}</div>
                      <div className={cn(
                        "text-xs font-mono",
                        trade.pnl >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Total P&L</div>
                  <div className="text-lg font-bold font-mono text-success">+$2,847.32</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                  <div className="text-lg font-bold font-mono">67.5%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Best Trade</div>
                  <div className="text-sm font-mono text-success">+$847.50</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Worst Trade</div>
                  <div className="text-sm font-mono text-destructive">-$123.45</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
