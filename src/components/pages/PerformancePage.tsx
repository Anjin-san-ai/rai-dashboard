/**
 * Performance & Reliability Page - Dark theme version
 */

import React from 'react';
import { Zap, Clock, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import PageLayout from '../PageLayout';
import Card from '../Card';

const PerformancePage: React.FC = () => {
  // Static performance metrics
  const metrics = {
    avgLatency: 245,
    p99Latency: 520,
    uptime: 99.97,
    requestsPerMinute: 1250,
    errorRate: 0.03,
    successRate: 99.97
  };

  const recentIncidents = [
    { id: 1, type: 'resolved', title: 'Latency spike detected', time: '2 hours ago', duration: '5 min' },
    { id: 2, type: 'resolved', title: 'Rate limit reached', time: '1 day ago', duration: '2 min' },
    { id: 3, type: 'resolved', title: 'Model timeout', time: '3 days ago', duration: '10 min' }
  ];

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Performance & Reliability</h1>
        <p className="text-muted-foreground mt-1">System performance metrics and reliability monitoring</p>
      </div>

      {/* System Status */}
      <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3 animate-fade-in">
        <CheckCircle className="text-success" size={22} />
        <div>
          <p className="font-medium text-success">All Systems Operational</p>
          <p className="text-xs text-success/70">Last checked: Just now</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="animate-fade-in stagger-1">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Avg Latency</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{metrics.avgLatency}ms</p>
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                -12% vs last week
              </p>
            </div>
            <div className="p-2.5 bg-accent/10 rounded-xl border border-accent/20">
              <Clock size={20} className="text-accent" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">P99 Latency</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{metrics.p99Latency}ms</p>
              <p className="text-xs text-muted-foreground mt-1">99th percentile</p>
            </div>
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
              <Zap size={20} className="text-primary" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-3">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Uptime</p>
              <p className="text-2xl font-bold font-mono text-success mt-1">{metrics.uptime}%</p>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </div>
            <div className="p-2.5 bg-success/10 rounded-xl border border-success/20">
              <CheckCircle size={20} className="text-success" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-4">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Requests/min</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{metrics.requestsPerMinute.toLocaleString()}</p>
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                +8% vs yesterday
              </p>
            </div>
            <div className="p-2.5 bg-warning/10 rounded-xl border border-warning/20">
              <Activity size={20} className="text-warning" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-5">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Error Rate</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{metrics.errorRate}%</p>
              <p className="text-xs text-success mt-1">Below threshold</p>
            </div>
            <div className="p-2.5 bg-destructive/10 rounded-xl border border-destructive/20">
              <AlertTriangle size={20} className="text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '300ms', opacity: 0 }}>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Success Rate</p>
              <p className="text-2xl font-bold font-mono text-success mt-1">{metrics.successRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
            </div>
            <div className="p-2.5 bg-success/10 rounded-xl border border-success/20">
              <CheckCircle size={20} className="text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Incidents */}
      <div className="glass-card animate-fade-in" style={{ animationDelay: '350ms', opacity: 0 }}>
        <div className="p-5 border-b border-border/30">
          <h3 className="text-base font-semibold text-foreground">Recent Incidents</h3>
          <p className="text-xs text-muted-foreground mt-0.5">System incidents and resolutions</p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {recentIncidents.map((incident) => (
              <div 
                key={incident.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle size={18} className="text-success" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{incident.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Duration: <span className="font-mono">{incident.duration}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-success/15 text-success border border-success/20">
                    Resolved
                  </span>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">{incident.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          {recentIncidents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle size={40} className="mx-auto mb-3 text-success" />
              <p className="text-sm">No recent incidents</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PerformancePage;
