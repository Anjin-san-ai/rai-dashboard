/**
 * Guardrails Dashboard - Dark theme version
 * Displays guardrails management interface
 */

import React from 'react';
import { Shield, Plus, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';
import PageLayout from '../PageLayout';
import Card from '../Card';
import { mockGuardrails, mockGuardrailsStats } from '../../data';

const GuardrailsDashboard: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-success" />;
      case 'inactive': return <Clock size={16} className="text-muted-foreground" />;
      case 'pending': return <Clock size={16} className="text-warning" />;
      default: return <Clock size={16} className="text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'input': return 'bg-accent/15 text-accent border border-accent/20';
      case 'output': return 'bg-primary/15 text-primary border border-primary/20';
      case 'both': return 'bg-success/15 text-success border border-success/20';
      default: return 'bg-secondary text-muted-foreground border border-border';
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Guardrails Management</h1>
          <p className="text-muted-foreground mt-1">Configure and monitor AI guardrails</p>
        </div>
        <button className="glow-button inline-flex items-center gap-2 w-fit">
          <Plus size={18} />
          <span>Create Guardrail</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="animate-fade-in stagger-1">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Guardrails</p>
              <p className="text-3xl font-bold font-mono text-foreground mt-1">{mockGuardrailsStats.totalGuardrails}</p>
              <p className="text-xs text-success mt-1">{mockGuardrailsStats.activeGuardrails} active</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Shield size={22} className="text-primary" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Threats Blocked</p>
              <p className="text-3xl font-bold font-mono text-foreground mt-1">{mockGuardrailsStats.totalBlocked}</p>
              <p className="text-xs text-accent mt-1">Last 24 hours</p>
            </div>
            <div className="p-3 bg-destructive/10 rounded-xl border border-destructive/20">
              <AlertTriangle size={22} className="text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-3">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Triggered</p>
              <p className="text-3xl font-bold font-mono text-foreground mt-1">{mockGuardrailsStats.totalTriggered}</p>
              <p className="text-xs text-warning mt-1">Last 24 hours</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-xl border border-warning/20">
              <Clock size={22} className="text-warning" />
            </div>
          </div>
        </Card>

        <Card className="animate-fade-in stagger-4">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Effectiveness</p>
              <p className="text-3xl font-bold font-mono text-success mt-1">{mockGuardrailsStats.overallEffectiveness}%</p>
              <p className="text-xs text-success mt-1">+2.1% this week</p>
            </div>
            <div className="p-3 bg-success/10 rounded-xl border border-success/20">
              <CheckCircle size={22} className="text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Guardrails List */}
      <div className="glass-card animate-fade-in stagger-5">
        <div className="p-5 border-b border-border/30">
          <h3 className="text-base font-semibold text-foreground">Active Guardrails</h3>
          <p className="text-xs text-muted-foreground mt-0.5">All configured guardrails and their performance</p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {mockGuardrails.map((guardrail) => (
              <div 
                key={guardrail.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30 hover:bg-secondary/50 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(guardrail.status)}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground">{guardrail.name}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getTypeColor(guardrail.type)}`}>
                        {guardrail.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{guardrail.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground/70">
                      <span>Triggered: <span className="font-mono text-muted-foreground">{guardrail.metrics.triggered}</span></span>
                      <span>Blocked: <span className="font-mono text-muted-foreground">{guardrail.metrics.blocked}</span></span>
                      <span>Effectiveness: <span className="font-mono text-success">{guardrail.metrics.effectiveness}%</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground hidden sm:block">{guardrail.lastTriggered}</span>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Settings size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GuardrailsDashboard;
