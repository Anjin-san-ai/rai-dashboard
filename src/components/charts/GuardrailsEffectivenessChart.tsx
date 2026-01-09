/**
 * Guardrails Effectiveness Chart - Dark theme version
 * Displays effectiveness metrics for RAI guardrails
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Shield, TrendingUp, Zap, CheckCircle } from 'lucide-react';

interface GuardrailMetric {
  name: string;
  effectiveness: number;
  detectionRate: number;
  preventionRate: number;
  color: string;
}

interface GuardrailsEffectivenessChartProps {
  className?: string;
}

const GuardrailsEffectivenessChart: React.FC<GuardrailsEffectivenessChartProps> = ({
  className = ''
}) => {
  // Static guardrails effectiveness data
  const guardrailsData: GuardrailMetric[] = [
    {
      name: 'PII Detection',
      effectiveness: 98.5,
      detectionRate: 99.2,
      preventionRate: 97.8,
      color: '#ef4444'
    },
    {
      name: 'Bias Detection',
      effectiveness: 94.3,
      detectionRate: 95.1,
      preventionRate: 93.5,
      color: '#8b5cf6'
    },
    {
      name: 'Toxicity Filter',
      effectiveness: 96.7,
      detectionRate: 97.5,
      preventionRate: 95.9,
      color: '#f59e0b'
    },
    {
      name: 'Content Safety',
      effectiveness: 97.2,
      detectionRate: 98.0,
      preventionRate: 96.4,
      color: '#10b981'
    }
  ];

  // Calculate overall metrics
  const overallEffectiveness = (
    guardrailsData.reduce((sum, g) => sum + g.effectiveness, 0) / guardrailsData.length
  ).toFixed(1);

  const overallDetection = (
    guardrailsData.reduce((sum, g) => sum + g.detectionRate, 0) / guardrailsData.length
  ).toFixed(1);

  const overallPrevention = (
    guardrailsData.reduce((sum, g) => sum + g.preventionRate, 0) / guardrailsData.length
  ).toFixed(1);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: GuardrailMetric }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-semibold text-foreground mb-2">{data.name}</p>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">
              Effectiveness: <span className="font-mono text-foreground">{data.effectiveness}%</span>
            </p>
            <p className="text-muted-foreground">
              Detection: <span className="font-mono text-foreground">{data.detectionRate}%</span>
            </p>
            <p className="text-muted-foreground">
              Prevention: <span className="font-mono text-foreground">{data.preventionRate}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`glass-card p-5 ${className}`}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Guardrails Effectiveness</h3>
        </div>
        <p className="text-xs text-muted-foreground">Performance metrics for RAI guardrails</p>
      </div>

      {/* Overall Metrics Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Effectiveness</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">{overallEffectiveness}%</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-[10px] text-success">+2.3%</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-medium text-accent uppercase tracking-wider">Detection</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">{overallDetection}%</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-[10px] text-success">+1.8%</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="w-3 h-3 text-success" />
            <span className="text-[10px] font-medium text-success uppercase tracking-wider">Prevention</span>
          </div>
          <div className="text-xl font-bold font-mono text-foreground">{overallPrevention}%</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-[10px] text-success">+1.5%</span>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={guardrailsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border) / 0.3)' }}
              tickLine={false}
            />
            <YAxis 
              domain={[80, 100]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary) / 0.3)' }} />
            <Bar 
              dataKey="effectiveness" 
              name="Effectiveness"
              radius={[6, 6, 0, 0]}
            >
              {guardrailsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>All guardrails operational</span>
        </div>
        <span>Updated just now</span>
      </div>
    </div>
  );
};

export default GuardrailsEffectivenessChart;
