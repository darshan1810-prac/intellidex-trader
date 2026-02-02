import { useState } from "react";
import { Shield, AlertTriangle, AlertCircle, CheckCircle, Search, RefreshCw, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { securityAlerts, transactions } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function SecurityMonitor() {
  const [searchHash, setSearchHash] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [analyzedRisk, setAnalyzedRisk] = useState<number | null>(null);

  const riskDistribution = [
    { name: "Safe", value: securityAlerts.safe, color: "hsl(var(--success))" },
    { name: "Medium", value: securityAlerts.medium, color: "hsl(var(--warning))" },
    { name: "High", value: securityAlerts.high, color: "hsl(var(--chart-bearish))" },
    { name: "Critical", value: securityAlerts.critical, color: "hsl(var(--destructive))" },
  ];

  const threatTrend = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    threats: Math.floor(Math.random() * 20) + 5,
  }));

  const threatTypes = [
    { type: "Phishing", count: 45 },
    { type: "Unusual Patterns", count: 32 },
    { type: "High-Value Movements", count: 28 },
    { type: "Known Bad Actors", count: 12 },
    { type: "Time Anomalies", count: 8 },
  ];

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-success";
    if (score < 60) return "text-warning";
    if (score < 80) return "text-chart-bearish";
    return "text-destructive";
  };

  const getRiskBg = (score: number) => {
    if (score < 30) return "bg-success/20";
    if (score < 60) return "bg-warning/20";
    if (score < 80) return "bg-chart-bearish/20";
    return "bg-destructive/20";
  };

  const handleAnalyze = () => {
    setAnalyzedRisk(Math.floor(Math.random() * 100));
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Security Monitor</h1>
        <p className="text-muted-foreground text-sm">
          Real-time blockchain transaction security analysis
        </p>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{securityAlerts.critical}</div>
                <div className="text-xs text-muted-foreground">Critical Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-chart-bearish/10 border-chart-bearish/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-chart-bearish/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-chart-bearish" />
              </div>
              <div>
                <div className="text-2xl font-bold text-chart-bearish">{securityAlerts.high}</div>
                <div className="text-xs text-muted-foreground">High Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning/10 border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{securityAlerts.medium}</div>
                <div className="text-xs text-muted-foreground">Medium Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-success/10 border-success/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{securityAlerts.safe}</div>
                <div className="text-xs text-muted-foreground">Safe Transactions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Monitor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Real-Time Transaction Monitor
                </CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Timestamp</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">TX Hash</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Risk Score</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 text-sm text-muted-foreground">{tx.timestamp}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{tx.hash}</span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{tx.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-mono">{tx.amount} ETH</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Progress 
                              value={tx.riskScore} 
                              className={cn("w-16 h-2", getRiskBg(tx.riskScore))}
                            />
                            <span className={cn("font-mono text-sm font-semibold", getRiskColor(tx.riskScore))}>
                              {tx.riskScore}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className={cn(
                            tx.status === "safe" && "bg-success/20 text-success border-success/30",
                            tx.status === "medium" && "bg-warning/20 text-warning border-warning/30",
                            tx.status === "high" && "bg-chart-bearish/20 text-chart-bearish border-chart-bearish/30",
                            tx.status === "critical" && "bg-destructive/20 text-destructive border-destructive/30"
                          )}>
                            {tx.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Risk Analysis */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Transaction Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="transaction">
                <TabsList>
                  <TabsTrigger value="transaction">Analyze Transaction</TabsTrigger>
                  <TabsTrigger value="address">Analyze Address</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transaction" className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        value={searchHash}
                        onChange={(e) => setSearchHash(e.target.value)}
                        placeholder="Paste transaction hash..." 
                        className="pl-9 font-mono"
                      />
                    </div>
                    <Button onClick={handleAnalyze}>Analyze</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="address" className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        placeholder="Paste ETH address..." 
                        className="pl-9 font-mono"
                      />
                    </div>
                    <Button onClick={handleAnalyze}>Analyze</Button>
                  </div>
                </TabsContent>
              </Tabs>

              {analyzedRisk !== null && (
                <div className="p-6 rounded-lg bg-muted/30 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Risk Score</span>
                    <div className={cn(
                      "text-4xl font-bold font-mono",
                      getRiskColor(analyzedRisk)
                    )}>
                      {analyzedRisk}/100
                    </div>
                  </div>
                  <Progress value={analyzedRisk} className={cn("h-3", getRiskBg(analyzedRisk))} />
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Risk Factors</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Unusual Patterns</span>
                          <Badge variant="outline" className="bg-warning/10 text-warning">Medium</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Known Bad Actors</span>
                          <Badge variant="outline" className="bg-success/10 text-success">None</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transaction Velocity</span>
                          <Badge variant="outline" className="bg-success/10 text-success">Normal</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Recommendations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Monitor for follow-up transactions</li>
                        <li>• Check related addresses</li>
                        <li>• Review transaction patterns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Analytics */}
        <div className="space-y-6">
          {/* Risk Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Threats Over Time */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Threats Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={threatTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="day" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="threats" 
                      stroke="hsl(var(--destructive))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Threat Types */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Top Threat Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={threatTypes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="type" width={100} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
