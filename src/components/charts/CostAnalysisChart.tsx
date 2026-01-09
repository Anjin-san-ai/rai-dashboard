/**
 * Cost Analysis Chart - Dark theme version for Responsible AI Dashboard
 * Displays cost metrics and breakdowns
 */

import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { 
  mockTokenAccountingData, 
  mockCostBreakdown, 
  mockCostMetrics,
  generateMockCostHistory,
  type CostBreakdown
} from '../../data';

interface CostAnalysisChartProps {
  onClick?: () => void;
  onCategoryClick?: (category: string) => void;
}

const CostAnalysisChart: React.FC<CostAnalysisChartProps> = ({
  onClick,
  onCategoryClick
}) => {
  const costHistory = generateMockCostHistory(20);
  const costBreakdown = mockCostBreakdown;
  const { totalDailyCost, costPerToken, costPerMinute, costTrend } = mockCostMetrics;

  const formatCurrency = (value: number) => {
    if (value < 0.01) return `$${value.toFixed(5)}`;
    return `$${value.toFixed(4)}`;
  };

  const isPositiveTrend = costTrend < 0; // Lower cost is positive

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="font-mono font-semibold text-foreground">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="glass-card p-5 cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">Cost Analysis</h3>
        <div className={`flex items-center gap-1.5 text-sm font-medium ${isPositiveTrend ? 'text-success' : 'text-destructive'}`}>
          {isPositiveTrend ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
          <span className="font-mono">{Math.abs(costTrend).toFixed(1)}%</span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <div className="text-[10px] text-accent font-medium uppercase tracking-wider">Daily Total</div>
          <div className="text-lg font-bold font-mono text-foreground">${totalDailyCost.toFixed(2)}</div>
        </div>
        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="text-[10px] text-success font-medium uppercase tracking-wider">Per 1k Tokens</div>
          <div className="text-lg font-bold font-mono text-foreground">{formatCurrency(costPerToken * 1000)}</div>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-[10px] text-primary font-medium uppercase tracking-wider">Per Minute</div>
          <div className="text-lg font-bold font-mono text-foreground">{formatCurrency(costPerMinute)}</div>
        </div>
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
          <div className="text-[10px] text-warning font-medium uppercase tracking-wider">Last Request</div>
          <div className="text-lg font-bold font-mono text-foreground">
            {formatCurrency(mockTokenAccountingData.total_cost)}
          </div>
        </div>
      </div>

      {/* Cost Trend Chart */}
      <div className="mb-5">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Cost Trend</h4>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border) / 0.3)' }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="totalCost" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                fill="url(#costGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Cost Breakdown</h4>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  dataKey="cost"
                  onClick={(entry: CostBreakdown) => onCategoryClick?.(entry.category)}
                  stroke="hsl(var(--background-deep))"
                  strokeWidth={2}
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-1.5">
            {costBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-medium text-foreground">{formatCurrency(item.cost)}</span>
                  <span className="text-muted-foreground/60 ml-1.5">{item.percentage.toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Info */}
      {mockTokenAccountingData.models && (
        <div className="pt-4 mt-4 border-t border-border/30">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Models Used</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {Object.entries(mockTokenAccountingData.models).map(([provider, models]) =>
              Object.keys(models).map(model => (
                <span 
                  key={`${provider}-${model}`} 
                  className="inline-block px-2 py-1 text-[10px] font-medium rounded bg-secondary/50 text-muted-foreground border border-border/30"
                >
                  {model}
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CostAnalysisChart;
