import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { PriceChart } from "@/components/charts/PriceChart";
import { RecentPredictionsCard } from "@/components/dashboard/RecentPredictionsCard";
import { SentimentCard } from "@/components/dashboard/SentimentCard";
import { ModelPerformanceCard } from "@/components/dashboard/ModelPerformanceCard";
import { priceHistory } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Real-time Bitcoin predictions and market analysis
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success pulse-live" />
          <span>Live data • Last updated: just now</span>
        </div>
      </div>

      {/* Metrics row */}
      <DashboardMetrics />

      {/* Main chart */}
      <PriceChart data={priceHistory} />

      {/* Bottom row - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RecentPredictionsCard />
        <SentimentCard />
        <ModelPerformanceCard />
      </div>
    </div>
  );
}
