import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
  children?: ReactNode;
}

export function MetricCard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon,
  trend,
  className,
  children,
}: MetricCardProps) {
  return (
    <Card className={cn("metric-card card-interactive bg-card border-border", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono-numbers">{value}</p>
              {change !== undefined && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-sm font-medium",
                    change > 0 ? "text-success" : change < 0 ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {change > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : change < 0 ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {change > 0 ? "+" : ""}{change}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {changeLabel && (
              <p className="text-xs text-muted-foreground">{changeLabel}</p>
            )}
          </div>
          {icon && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
