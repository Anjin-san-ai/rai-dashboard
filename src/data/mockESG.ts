/**
 * Mock data for ESG (Environmental, Social, Governance) metrics
 * Static data for the Responsible AI dashboard
 */

export interface ESGMetric {
  category: 'Environmental' | 'Social' | 'Governance';
  score: number;
  color: string;
  status: 'excellent' | 'good' | 'attention' | 'risk';
  details: string;
}

export interface SustainabilityMetrics {
  energy_kwh: number;
  carbon_g_co2: number;
  water_liters: number;
  model_name: string;
}

export interface ESGData {
  metrics: ESGMetric[];
  overallScore: number;
  rating: string;
  sustainabilityMetrics: SustainabilityMetrics;
}

export const mockESGMetrics: ESGMetric[] = [
  {
    category: 'Environmental',
    score: 85,
    color: '#10b981',
    status: 'excellent',
    details: 'Carbon: 0.066g CO₂, Energy: 0.0003 kWh'
  },
  {
    category: 'Social',
    score: 68,
    color: '#3b82f6',
    status: 'good',
    details: 'Based on bias detection and fairness metrics'
  },
  {
    category: 'Governance',
    score: 58,
    color: '#8b5cf6',
    status: 'attention',
    details: 'Constitutional AI principles + compliance framework'
  }
];

export const mockSustainabilityMetrics: SustainabilityMetrics = {
  energy_kwh: 0.0003,
  carbon_g_co2: 0.066,
  water_liters: 0.0005,
  model_name: 'gpt-4o'
};

export const mockESGData: ESGData = {
  metrics: mockESGMetrics,
  overallScore: 70,
  rating: 'B',
  sustainabilityMetrics: mockSustainabilityMetrics
};

export default mockESGData;
