/**
 * Sustainability & Cost Page - Dark theme version
 */

import React from 'react';
import { Leaf, DollarSign, Zap, Droplet, TrendingDown, BarChart2 } from 'lucide-react';
import PageLayout from '../PageLayout';
import Card from '../Card';
import { ESGChart, CostAnalysisChart } from '../charts';
import { mockSustainabilityMetrics, mockCostMetrics } from '../../data';

const SustainabilityPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Sustainability & Cost</h1>
        <p className="text-muted-foreground mt-1">Environmental impact and cost optimization metrics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="animate-fade-in stagger-1">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Daily Cost</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">${mockCostMetrics.totalDailyCost.toFixed(2)}</p>
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <TrendingDown size={12} />
                -2.3% vs yesterday
              </p>
            </div>
            <div className="p-2.5 bg-accent/10 rounded-xl border border-accent/20">
              <DollarSign size={20} className="text-accent" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Carbon Footprint</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{mockSustainabilityMetrics.carbon_g_co2.toFixed(3)}g</p>
              <p className="text-xs text-muted-foreground mt-1">CO₂ per inference</p>
            </div>
            <div className="p-2.5 bg-success/10 rounded-xl border border-success/20">
              <Leaf size={20} className="text-success" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-3">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Energy Usage</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{mockSustainabilityMetrics.energy_kwh.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground mt-1">kWh per inference</p>
            </div>
            <div className="p-2.5 bg-warning/10 rounded-xl border border-warning/20">
              <Zap size={20} className="text-warning" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-4">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Water Usage</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{mockSustainabilityMetrics.water_liters.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground mt-1">Liters per inference</p>
            </div>
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
              <Droplet size={20} className="text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="animate-fade-in stagger-5">
          <ESGChart />
        </div>
        <div className="animate-fade-in stagger-5">
          <CostAnalysisChart />
        </div>
      </div>

      {/* Additional Info */}
      <div className="glass-card animate-fade-in" style={{ animationDelay: '400ms', opacity: 0 }}>
        <div className="p-5 border-b border-border/30">
          <h3 className="text-base font-semibold text-foreground">Sustainability Insights</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Environmental impact analysis</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-success/10 rounded-lg border border-success/20">
                  <Leaf size={18} className="text-success" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Carbon Efficiency</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your AI workloads are producing <span className="font-mono text-foreground">{mockSustainabilityMetrics.carbon_g_co2.toFixed(3)}g</span> CO₂ per inference,
                    which is below the industry average of 0.1g.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                  <BarChart2 size={18} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Model Efficiency</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Using <span className="font-mono text-foreground">{mockSustainabilityMetrics.model_name}</span> for optimal balance between
                    performance and environmental impact.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-success/10 to-accent/10 border border-success/20">
              <h4 className="font-semibold text-foreground text-sm mb-3">Recommendations</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>Consider batch processing for non-urgent requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>Enable response caching for frequent queries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>Use smaller models for simple tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>Schedule heavy workloads during off-peak hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SustainabilityPage;
