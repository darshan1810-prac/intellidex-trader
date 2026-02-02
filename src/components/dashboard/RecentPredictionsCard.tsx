import { Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { recentPredictions } from "@/lib/mockData";

export function RecentPredictionsCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Recent Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentPredictions.map((pred, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">${pred.price.toLocaleString()}</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5">
                      {pred.horizon}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{pred.time}</span>
                </div>
              </div>
              <ConfidenceBadge confidence={pred.confidence} showLabel={false} size="sm" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
