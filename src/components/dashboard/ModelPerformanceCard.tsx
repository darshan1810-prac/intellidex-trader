import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { modelPerformance } from "@/lib/mockData";

export function ModelPerformanceCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          Model Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <span className="text-xl font-bold font-mono-numbers text-primary">
              {modelPerformance.mae}
            </span>
            <p className="text-[10px] text-muted-foreground uppercase">MAE ($)</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold font-mono-numbers">
              {modelPerformance.mape}%
            </span>
            <p className="text-[10px] text-muted-foreground uppercase">MAPE</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold font-mono-numbers text-success">
              {modelPerformance.directionAccuracy}%
            </span>
            <p className="text-[10px] text-muted-foreground uppercase">Direction</p>
          </div>
        </div>

        {/* Accuracy progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Accuracy</span>
            <span className="font-mono-numbers">{modelPerformance.directionAccuracy}%</span>
          </div>
          <Progress value={modelPerformance.directionAccuracy} className="h-2" />
        </div>

        {/* 30-day trend */}
        <div className="h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={modelPerformance.last30Days}>
              <XAxis dataKey="day" hide />
              <YAxis domain={[60, 90]} hide />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-muted-foreground text-center">30-day accuracy trend</p>
      </CardContent>
    </Card>
  );
}
