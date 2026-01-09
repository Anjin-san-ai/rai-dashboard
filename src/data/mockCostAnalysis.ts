/**
 * Mock data for Cost Analysis metrics
 * Static data for the Responsible AI dashboard
 */

export interface TokenAccountingData {
  total_tokens: number;
  prompt_tokens: number;
  completion_tokens: number;
  successful_requests: number;
  total_cost: number;
  time_taken_in_seconds: number;
  models?: {
    [provider: string]: {
      [model: string]: {
        total_tokens: number;
        prompt_tokens: number;
        completion_tokens: number;
        successful_requests: number;
        total_cost: number;
        time_taken_in_seconds: number;
      };
    };
  };
}

export interface CostMetric {
  timestamp: string;
  totalCost: number;
  promptCost: number;
  completionCost: number;
  infraCost: number;
  energyCost: number;
}

export interface CostBreakdown {
  category: string;
  cost: number;
  percentage: number;
  color: string;
}

export const mockTokenAccountingData: TokenAccountingData = {
  total_tokens: 6329,
  prompt_tokens: 5707,
  completion_tokens: 622,
  successful_requests: 1,
  total_cost: 0.0205,
  time_taken_in_seconds: 12.60,
  models: {
    openai: {
      'gpt-4o': {
        total_tokens: 6329,
        prompt_tokens: 5707,
        completion_tokens: 622,
        successful_requests: 1,
        total_cost: 0.0205,
        time_taken_in_seconds: 12.60
      }
    }
  }
};

// Generate historical cost data for the chart
export const generateMockCostHistory = (count: number = 20): CostMetric[] => {
  const history: CostMetric[] = [];
  const baseTimestamp = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(baseTimestamp.getTime() - i * 3 * 60 * 1000); // 3 min intervals
    const variation = 0.8 + Math.random() * 0.4;
    const baseCost = 0.022 * variation;
    
    history.push({
      timestamp: timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      totalCost: baseCost,
      promptCost: baseCost * 0.7,
      completionCost: baseCost * 0.2,
      infraCost: 0.0014,
      energyCost: 0.00045
    });
  }
  
  return history;
};

export const mockCostBreakdown: CostBreakdown[] = [
  {
    category: 'API Costs',
    cost: 0.0205,
    percentage: 91.5,
    color: '#3b82f6'
  },
  {
    category: 'Infrastructure',
    cost: 0.0014,
    percentage: 6.5,
    color: '#10b981'
  },
  {
    category: 'Energy',
    cost: 0.00045,
    percentage: 2.0,
    color: '#f59e0b'
  }
];

export const mockCostMetrics = {
  totalDailyCost: 6.58,
  costPerToken: 0.0000032,
  costPerMinute: 0.0977,
  costTrend: -2.3
};

export default mockTokenAccountingData;
