import { BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts";
import { modelPerformance } from "@/lib/mockData";

export function ModelPerformanceCard() {
  return (
    <Card className="card-interactive">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          Model Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-xl bg-muted/20">
            <span className="text-xl font-bold font-mono-numbers text-primary">
              {modelPerformance.mae}
            </span>
            <p className="text-[10px] text-muted-foreground uppercase mt-1 font-medium">MAE ($)</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/20">
            <span className="text-xl font-bold font-mono-numbers">
              {modelPerformance.mape}%
            </span>
            <p className="text-[10px] text-muted-foreground uppercase mt-1 font-medium">MAPE</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-success/10">
            <span className="text-xl font-bold font-mono-numbers text-success">
              {modelPerformance.directionAccuracy}%
            </span>
            <p className="text-[10px] text-muted-foreground uppercase mt-1 font-medium">Direction</p>
          </div>
        </div>

        {/* Accuracy progress */}
        <div className="space-y-2.5 p-3 rounded-xl bg-muted/20">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Accuracy</span>
            <span className="font-mono-numbers font-semibold">{modelPerformance.directionAccuracy}%</span>
          </div>
          <div className="relative">
            <Progress value={modelPerformance.directionAccuracy} className="h-2.5" />
            <div 
              className="absolute top-0 h-2.5 bg-gradient-to-r from-primary/80 to-success/80 rounded-full transition-all"
              style={{ width: `${modelPerformance.directionAccuracy}%` }}
            />
          </div>
        </div>

        {/* 30-day trend */}
        <div className="h-[70px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={modelPerformance.last30Days}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis domain={[60, 90]} hide />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#accuracyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-muted-foreground text-center font-medium">30-day accuracy trend</p>
      </CardContent>
    </Card>
  );
}
