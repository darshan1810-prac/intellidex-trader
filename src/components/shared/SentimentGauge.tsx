import { cn } from "@/lib/utils";

interface SentimentGaugeProps {
  score: number; // -1 to 1
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function SentimentGauge({ score, size = "md", showLabel = true, className }: SentimentGaugeProps) {
  // Normalize score from -1...1 to 0...180 degrees
  const rotation = ((score + 1) / 2) * 180;
  
  const getSentimentLabel = () => {
    if (score > 0.3) return "BULLISH";
    if (score < -0.3) return "BEARISH";
    return "NEUTRAL";
  };

  const getSentimentColor = () => {
    if (score > 0.3) return "text-success";
    if (score < -0.3) return "text-destructive";
    return "text-warning";
  };

  const sizeClasses = {
    sm: { container: "w-24 h-12", text: "text-lg", label: "text-[10px]" },
    md: { container: "w-32 h-16", text: "text-2xl", label: "text-xs" },
    lg: { container: "w-48 h-24", text: "text-4xl", label: "text-sm" },
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size].container)}>
        {/* Background arc */}
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--destructive))" />
              <stop offset="50%" stopColor="hsl(var(--warning))" />
              <stop offset="100%" stopColor="hsl(var(--success))" />
            </linearGradient>
          </defs>
          
          {/* Background track */}
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Filled arc */}
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            className="opacity-80"
          />
          
          {/* Needle */}
          <g transform={`rotate(${rotation - 90}, 50, 45)`}>
            <line
              x1="50"
              y1="45"
              x2="50"
              y2="12"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="45" r="4" fill="hsl(var(--foreground))" />
          </g>
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-x-0 bottom-0 text-center">
          <span className={cn("font-bold font-mono-numbers", sizeClasses[size].text, getSentimentColor())}>
            {score > 0 ? "+" : ""}{score.toFixed(2)}
          </span>
        </div>
      </div>
      
      {showLabel && (
        <span className={cn("font-semibold tracking-wider", sizeClasses[size].label, getSentimentColor())}>
          {getSentimentLabel()}
        </span>
      )}
      
      {/* Scale labels */}
      <div className="flex justify-between w-full px-2 text-[10px] text-muted-foreground">
        <span>-1.0</span>
        <span>0</span>
        <span>+1.0</span>
      </div>
    </div>
  );
}
