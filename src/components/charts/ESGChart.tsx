/**
 * ESG Chart - Dark theme version for Responsible AI Dashboard
 * Displays Environmental, Social, and Governance metrics
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockESGData, type ESGMetric } from '../../data';

interface ESGChartProps {
  metrics?: ESGMetric[];
  onClick?: () => void;
  onCategoryClick?: (category: string) => void;
}

const ESGChart: React.FC<ESGChartProps> = ({
  metrics = mockESGData.metrics,
  onClick,
  onCategoryClick
}) => {
  // Calculate overall score and rating
  const overallScore = Math.round(
    metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length
  );

  const getRating = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const rating = getRating(overallScore);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getRatingColor = (rating: string) => {
    if (rating === 'A') return 'text-success';
    if (rating.startsWith('B')) return 'text-accent';
    if (rating === 'C') return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return { class: 'status-badge success', label: 'Excellent' };
      case 'good': return { class: 'status-badge', style: { background: 'hsl(var(--accent) / 0.15)', color: 'hsl(var(--accent))', border: '1px solid hsl(var(--accent) / 0.2)' }, label: 'Good' };
      case 'attention': return { class: 'status-badge warning', label: 'Attention' };
      case 'risk': return { class: 'status-badge error', label: 'Risk' };
      default: return { class: 'status-badge', label: status };
    }
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ESGMetric }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-semibold text-foreground">{data.category}</p>
          <p className="text-muted-foreground">Score: <span className="font-mono text-foreground">{data.score}%</span></p>
          <p className="text-xs text-muted-foreground/70 mt-1">{data.details}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">ESG Compliance</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Environmental, Social & Governance</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* ESG Donut Chart */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={metrics}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                innerRadius={45}
                fill="#8884d8"
                dataKey="score"
                onClick={onClick}
                className="cursor-pointer"
                animationBegin={0}
                animationDuration={800}
                stroke="hsl(var(--background-deep))"
                strokeWidth={2}
              >
                {metrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl font-bold ${getRatingColor(rating)}`}>
              {rating}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
              ESG Rating
            </div>
            <div className={`text-sm font-bold font-mono mt-0.5 ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
          </div>
        </div>

        {/* ESG Metrics Breakdown */}
        <div className="flex-1 w-full space-y-2">
          <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-3">
            ESG Components
          </h4>
          {metrics.map((metric, index) => {
            const badge = getStatusBadge(metric.status);
            return (
              <div 
                key={index} 
                className="p-2.5 rounded-lg bg-secondary/30 border border-border/30 cursor-pointer hover:bg-secondary/50 hover:border-primary/20 transition-all"
                onClick={() => onCategoryClick?.(metric.category)}
              >
                {/* Metric Header */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className={badge.class}
                      style={badge.style}
                    >
                      {badge.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{metric.category}</span>
                  </div>
                  <span className={`text-sm font-bold font-mono ${getScoreColor(metric.score)}`}>
                    {Math.round(metric.score)}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    style={{ 
                      width: `${metric.score}%`,
                      background: `linear-gradient(90deg, ${metric.color}, ${metric.color}cc)`
                    }}
                  />
                </div>
                
                {/* Details */}
                <div className="text-[11px] text-muted-foreground/70 mt-1.5 truncate">
                  {metric.details}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ESG Rating Scale */}
      <div className="mt-5 pt-4 border-t border-border/30">
        <div className="grid grid-cols-4 gap-2 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-4 bg-success rounded text-background flex items-center justify-center font-bold">A</span>
            <span className="text-muted-foreground">90-100</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-4 bg-accent rounded text-background flex items-center justify-center font-bold">B</span>
            <span className="text-muted-foreground">70-89</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-4 bg-warning rounded text-background flex items-center justify-center font-bold">C</span>
            <span className="text-muted-foreground">60-69</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-4 bg-destructive rounded text-background flex items-center justify-center font-bold">D</span>
            <span className="text-muted-foreground">0-59</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGChart;
