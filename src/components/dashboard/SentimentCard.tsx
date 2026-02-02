import { TrendingUp, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentGauge } from "@/components/shared/SentimentGauge";
import { MiniSparkline } from "@/components/charts/MiniSparkline";
import { sentimentData } from "@/lib/mockData";

export function SentimentCard() {
  const sentimentHistory = [0.45, 0.52, 0.48, 0.55, 0.60, 0.58, 0.62, 0.65];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Market Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <SentimentGauge score={sentimentData.score} size="md" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Trend</span>
            <div className="flex items-center gap-2">
              <MiniSparkline data={sentimentHistory} color="success" height={20} className="w-16" />
              <span className="text-success text-xs font-medium">Rising</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">News Volume</span>
            <span className="font-mono-numbers">{sentimentData.newsVolume} articles</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Headlines</span>
          {sentimentData.topHeadlines.slice(0, 2).map((headline, index) => (
            <div key={index} className="flex gap-2 text-xs">
              <Newspaper className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-muted-foreground line-clamp-2">{headline}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
