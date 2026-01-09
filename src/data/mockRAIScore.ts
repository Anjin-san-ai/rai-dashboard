/**
 * Mock data for RAI Score metrics
 * Static data for the Responsible AI dashboard
 */

export interface RAIMetric {
  name: string;
  value: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface RAIScoreData {
  overallScore: number;
  metrics: RAIMetric[];
  lastUpdated: string;
}

export const mockRAIScoreData: RAIScoreData = {
  overallScore: 78,
  metrics: [
    { name: 'AI Safety', value: 85, color: '#8b5cf6', trend: 'up', riskLevel: 'low' },
    { name: 'Performance', value: 82, color: '#06b6d4', trend: 'stable', riskLevel: 'low' },
    { name: 'Security', value: 72, color: '#10b981', trend: 'down', riskLevel: 'medium' },
    { name: 'Compliance', value: 74, color: '#f59e0b', trend: 'up', riskLevel: 'medium' }
  ],
  lastUpdated: new Date().toISOString()
};

export const mockChartData = [
  { name: 'Low', value: 40, color: '#ef4444' },
  { name: 'Medium', value: 40, color: '#f59e0b' },
  { name: 'High', value: 20, color: '#10b981' }
];

export default mockRAIScoreData;
