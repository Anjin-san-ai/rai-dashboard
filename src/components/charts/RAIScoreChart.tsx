/**
 * RAI Score Chart - Dark theme version for Responsible AI Dashboard
 * Displays the overall RAI score with metric breakdowns
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { mockRAIScoreData, type RAIMetric } from '../../data';

const RADIAN = Math.PI / 180;

// Chart colors for dark theme
const DARK_CHART_DATA = [
  { name: 'Critical', value: 40, color: '#ef4444' },
  { name: 'Warning', value: 40, color: '#f59e0b' },
  { name: 'Good', value: 20, color: '#10b981' },
];

// Needle component for gauge chart
const Needle = (props: { cx: number; cy: number; value: number; max: number }) => {
  const { cx, cy, value, max } = props;
  
  if (!cx || !cy) return null;
  
  const ang = 180.0 * (1 - value / max);
  const length = 35;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 4;
  
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <g>
      <circle cx={x0} cy={y0} r={r} fill="#f8fafc" stroke="none" />
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="none"
        fill="#f8fafc"
      />
    </g>
  );
};

interface RAIScoreChartProps {
  raiScore?: number;
  metrics?: RAIMetric[];
  onClick?: () => void;
  onMetricClick?: (metricName: string) => void;
}

const RAIScoreChart: React.FC<RAIScoreChartProps> = ({
  raiScore = mockRAIScoreData.overallScore,
  metrics = mockRAIScoreData.metrics,
  onClick,
  onMetricClick
}) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 65) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gauge Chart */}
        <div className="relative w-full">
          <div 
            className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity w-full"
            onClick={onClick}
          >
            <div className="relative w-full max-w-[280px] aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={DARK_CHART_DATA}
                    cx="50%"
                    cy="55%"
                    innerRadius="50%"
                    outerRadius="80%"
                    stroke="none"
                    isAnimationActive={true}
                    animationDuration={800}
                  >
                    {DARK_CHART_DATA.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Needle Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <Needle 
                    value={raiScore} 
                    max={100}
                    cx={50}
                    cy={55}
                  />
                </svg>
              </div>

              {/* Score display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                <div className={`text-4xl font-bold font-mono ${getScoreColor(raiScore)}`}>
                  {Math.round(raiScore)}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  RAI Score
                </div>
              </div>
            </div>

            {/* Score ranges indicator */}
            <div className="flex items-center gap-4 mt-2 text-xs flex-wrap justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">0-39</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-warning"></div>
                <span className="text-muted-foreground">40-79</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
                <span className="text-muted-foreground">80-100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
            Component Metrics
          </h4>
          <div className="space-y-2">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg bg-secondary/30 border border-border/30 cursor-pointer hover:bg-secondary/50 hover:border-primary/20 transition-all"
                onClick={() => onMetricClick?.(metric.name)}
              >
                {/* Metric Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: metric.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold font-mono ${getScoreColor(metric.value)}`}>
                      {metric.value}%
                    </span>
                    <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    style={{ 
                      width: `${metric.value}%`,
                      background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)`
                    }}
                  />
                </div>
                
                {/* Risk Level */}
                <div className="flex justify-end mt-1.5">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${getRiskColor(metric.riskLevel)}`}>
                    {metric.riskLevel} risk
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Status */}
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Overall Status</p>
                <p className={`text-xs font-semibold ${raiScore >= 80 ? 'text-success' : raiScore >= 65 ? 'text-warning' : 'text-destructive'}`}>
                  {raiScore >= 80 ? 'EXCELLENT' : raiScore >= 65 ? 'GOOD' : 'NEEDS ATTENTION'}
                </p>
              </div>
              <div className={`text-2xl font-bold font-mono ${getScoreColor(raiScore)}`}>
                {Math.round(raiScore)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAIScoreChart;
