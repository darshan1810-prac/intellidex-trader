import { Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { recentPredictions } from "@/lib/mockData";

export function RecentPredictionsCard() {
  return (
    <Card className="card-interactive">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          Recent Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentPredictions.map((pred, index) => (
            <div 
              key={index}
              className="group flex items-center justify-between p-3.5 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold font-mono-numbers">${pred.price.toLocaleString()}</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-2 font-medium bg-muted/50">
                      {pred.horizon}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{pred.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge confidence={pred.confidence} showLabel={false} size="sm" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
