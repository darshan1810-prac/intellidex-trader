import { Bitcoin, TrendingUp, Wallet, Activity } from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { StatusIndicator } from "@/components/shared/StatusIndicator";
import { MiniSparkline } from "@/components/charts/MiniSparkline";
import { Badge } from "@/components/ui/badge";
import { currentPrice, latestPrediction, activePositions, systemHealth } from "@/lib/mockData";

export function DashboardMetrics() {
  // Mock sparkline data
  const priceSparkline = [51200, 51350, 51180, 51450, 51800, 52100, 51950, 52300, 52150, 52347];
  const accuracySparkline = [75, 78, 72, 80, 82, 79, 77, 81, 83, 78];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Current BTC Price */}
      <MetricCard
        title="Current BTC Price"
        value=""
        icon={<Bitcoin className="w-5 h-5" />}
      >
        <div className="mt-2">
          <PriceDisplay 
            price={currentPrice.price} 
            changePercent={currentPrice.change24h}
            change={currentPrice.price * (currentPrice.change24h / 100)}
            size="lg"
          />
          <MiniSparkline 
            data={priceSparkline} 
            color={currentPrice.change24h >= 0 ? "success" : "destructive"}
            height={32}
            className="mt-3"
          />
        </div>
      </MetricCard>

      {/* Latest Prediction */}
      <MetricCard
        title="Latest Prediction"
        value=""
        icon={<TrendingUp className="w-5 h-5" />}
      >
        <div className="mt-2 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Next {latestPrediction.horizon}:</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {latestPrediction.sentiment}
            </Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-numbers text-primary">
              ${latestPrediction.predictedPrice.toLocaleString()}
            </span>
            <span className="text-sm text-success">+{latestPrediction.change}%</span>
          </div>
          <ConfidenceBadge confidence={latestPrediction.confidence} size="sm" />
        </div>
      </MetricCard>

      {/* Active Positions */}
      <MetricCard
        title="Active Positions"
        value=""
        icon={<Wallet className="w-5 h-5" />}
      >
        <div className="mt-2 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{activePositions.count}</span>
            <span className="text-sm text-muted-foreground">open trades</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">P&L: </span>
              <span className="font-semibold text-success font-mono-numbers">
                +${activePositions.totalPnL.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Win: </span>
              <span className="font-semibold font-mono-numbers">{activePositions.winRate}%</span>
            </div>
          </div>
        </div>
      </MetricCard>

      {/* System Health */}
      <MetricCard
        title="System Health"
        value=""
        icon={<Activity className="w-5 h-5" />}
      >
        <div className="mt-2 space-y-3">
          <StatusIndicator status="active" label="Data Collection" size="sm" />
          <div className="text-sm text-muted-foreground">
            <span>Model updated: </span>
            <span className="text-foreground">{systemHealth.lastModelUpdate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Accuracy:</span>
            <span className="font-semibold font-mono-numbers">{systemHealth.accuracy}%</span>
            <MiniSparkline 
              data={accuracySparkline} 
              color="success"
              height={20}
              className="flex-1"
            />
          </div>
        </div>
      </MetricCard>
    </div>
  );
}
