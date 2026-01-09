/**
 * Live Dashboard - Real-time monitoring view (dark theme)
 */

import React from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import PageLayout from '../PageLayout';
import Card from '../Card';
import { GuardrailsEffectivenessChart } from '../charts';
import { mockGuardrailsStats } from '../../data';

const LiveDashboard: React.FC = () => {
  // Static recent events data
  const recentEvents = [
    { id: 1, type: 'blocked', guardrail: 'PII Detection', message: 'Blocked PII in output', time: '2 min ago', severity: 'high' },
    { id: 2, type: 'triggered', guardrail: 'Toxicity Filter', message: 'Content flagged for review', time: '5 min ago', severity: 'medium' },
    { id: 3, type: 'blocked', guardrail: 'Bias Detection', message: 'Potential bias detected', time: '8 min ago', severity: 'medium' },
    { id: 4, type: 'passed', guardrail: 'Content Safety', message: 'Content approved', time: '10 min ago', severity: 'low' },
    { id: 5, type: 'blocked', guardrail: 'Prompt Injection', message: 'Attack attempt blocked', time: '15 min ago', severity: 'high' }
  ];

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 border-destructive/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-secondary/30 border-border/30';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'blocked': return <AlertTriangle size={16} className="text-destructive" />;
      case 'triggered': return <Zap size={16} className="text-warning" />;
      case 'passed': return <CheckCircle size={16} className="text-success" />;
      default: return <Activity size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Dashboard</h1>
            <p className="text-muted-foreground mt-1">Real-time guardrail monitoring and alerts</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium text-success">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="animate-fade-in stagger-1">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Guardrails</p>
              <p className="text-2xl font-bold font-mono text-foreground mt-1">{mockGuardrailsStats.activeGuardrails}</p>
            </div>
            <Shield className="text-primary" size={22} />
          </div>
        </Card>
        
        <Card className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Blocked Today</p>
              <p className="text-2xl font-bold font-mono text-destructive mt-1">{mockGuardrailsStats.totalBlocked}</p>
            </div>
            <AlertTriangle className="text-destructive" size={22} />
          </div>
        </Card>
        
        <Card className="animate-fade-in stagger-3">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Detection Rate</p>
              <p className="text-2xl font-bold font-mono text-success mt-1">97.5%</p>
            </div>
            <TrendingUp className="text-success" size={22} />
          </div>
        </Card>
        
        <Card className="animate-fade-in stagger-4">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Response</p>
              <p className="text-2xl font-bold font-mono text-accent mt-1">12ms</p>
            </div>
            <Zap className="text-accent" size={22} />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Guardrails Chart */}
        <div className="animate-fade-in stagger-5">
          <GuardrailsEffectivenessChart />
        </div>

        {/* Recent Events */}
        <div className="glass-card animate-fade-in stagger-5">
          <div className="p-5 border-b border-border/30">
            <h3 className="text-base font-semibold text-foreground">Recent Events</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Latest guardrail activities</p>
          </div>
          <div className="p-4 space-y-2">
            {recentEvents.map((event) => (
              <div 
                key={event.id} 
                className={`flex items-center gap-3 p-3 rounded-xl border ${getSeverityStyle(event.severity)}`}
              >
                {getEventIcon(event.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground truncate">{event.guardrail}</span>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{event.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{event.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border/30">
            <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LiveDashboard;
