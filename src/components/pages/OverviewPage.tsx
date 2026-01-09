/**
 * Overview Page - Main dashboard for Responsible AI metrics
 * Dark theme with glassmorphism
 */

import React from 'react';
import PageLayout from '../PageLayout';
import { 
  RAIScoreChart, 
  ESGChart, 
  CostAnalysisChart, 
  GuardrailsEffectivenessChart 
} from '../charts';
import { mockRAIScoreData } from '../../data';
import type { DashboardSection } from '../Sidebar';

interface OverviewPageProps {
  raiScore?: number;
  onSectionChange?: (section: DashboardSection) => void;
}

const OverviewPage: React.FC<OverviewPageProps> = ({
  raiScore = mockRAIScoreData.overallScore,
  onSectionChange
}) => {
  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your AI system's responsible AI metrics</p>
      </div>

      {/* Main Dashboard Grid - Asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column - RAI Score + ESG stacked */}
        <div className="space-y-5">
          {/* RAI Score Chart */}
          <div className="glass-card p-5 animate-fade-in stagger-1">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground">RAI Score</h3>
              <p className="text-xs text-muted-foreground">Responsible AI compliance score</p>
            </div>
            <RAIScoreChart
              raiScore={raiScore}
              onMetricClick={(metricName) => {
                if (metricName === 'AI Safety') {
                  onSectionChange?.('performance-reliability');
                } else {
                  console.log(`Navigate to ${metricName} details`);
                }
              }}
            />
          </div>

          {/* ESG Chart */}
          <div className="animate-fade-in stagger-2">
            <ESGChart
              onCategoryClick={(category) => {
                if (category === 'Environmental') {
                  onSectionChange?.('sustainability-cost');
                } else {
                  console.log(`Navigate to ${category} ESG details`);
                }
              }}
            />
          </div>
        </div>

        {/* Right Column - Cost Analysis + Guardrails */}
        <div className="space-y-5">
          {/* Cost Analysis Chart */}
          <div className="animate-fade-in stagger-3">
            <CostAnalysisChart
              onClick={() => onSectionChange?.('sustainability-cost')}
              onCategoryClick={(category) => {
                console.log(`Navigate to ${category} cost details`);
              }}
            />
          </div>
          
          {/* Guardrails Effectiveness Chart */}
          <div className="animate-fade-in stagger-4">
            <GuardrailsEffectivenessChart />
          </div>
        </div>
      </div>   
    </PageLayout>
  );
};

export default OverviewPage;
