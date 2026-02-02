import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { PriceChart } from "@/components/charts/PriceChart";
import { RecentPredictionsCard } from "@/components/dashboard/RecentPredictionsCard";
import { SentimentCard } from "@/components/dashboard/SentimentCard";
import { ModelPerformanceCard } from "@/components/dashboard/ModelPerformanceCard";
import { priceHistory } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-8 space-y-8 animate-fade-in max-w-[1800px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time Bitcoin predictions and market analysis
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card/60 border border-border/40 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm text-muted-foreground">Live data • Updated just now</span>
        </div>
      </div>

      {/* Metrics row */}
      <DashboardMetrics />

      {/* Main chart */}
      <PriceChart data={priceHistory} />

      {/* Bottom row - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentPredictionsCard />
        <SentimentCard />
        <ModelPerformanceCard />
      </div>
    </div>
  );
}
