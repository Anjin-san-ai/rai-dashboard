/**
 * Mock data for Guardrails
 * Static data for the Responsible AI dashboard
 */

export interface Guardrail {
  id: string;
  name: string;
  description: string;
  type: 'input' | 'output' | 'both';
  status: 'active' | 'inactive' | 'pending';
  category: string;
  metrics: {
    triggered: number;
    blocked: number;
    passed: number;
    effectiveness: number;
  };
  lastTriggered?: string;
  createdAt: string;
}

export interface GuardrailsStats {
  totalGuardrails: number;
  activeGuardrails: number;
  totalBlocked: number;
  totalTriggered: number;
  overallEffectiveness: number;
  byCategory: {
    category: string;
    count: number;
    effectiveness: number;
  }[];
}

export const mockGuardrails: Guardrail[] = [
  {
    id: 'gr-001',
    name: 'PII Detection',
    description: 'Detects and blocks personally identifiable information in responses',
    type: 'output',
    status: 'active',
    category: 'Privacy',
    metrics: {
      triggered: 245,
      blocked: 230,
      passed: 15,
      effectiveness: 93.9
    },
    lastTriggered: '2 minutes ago',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'gr-002',
    name: 'Toxicity Filter',
    description: 'Filters toxic, harmful, or offensive content',
    type: 'both',
    status: 'active',
    category: 'Safety',
    metrics: {
      triggered: 189,
      blocked: 185,
      passed: 4,
      effectiveness: 97.9
    },
    lastTriggered: '5 minutes ago',
    createdAt: '2024-01-10T08:30:00Z'
  },
  {
    id: 'gr-003',
    name: 'Bias Detection',
    description: 'Monitors and mitigates biased outputs',
    type: 'output',
    status: 'active',
    category: 'Fairness',
    metrics: {
      triggered: 156,
      blocked: 142,
      passed: 14,
      effectiveness: 91.0
    },
    lastTriggered: '15 minutes ago',
    createdAt: '2024-01-12T14:00:00Z'
  },
  {
    id: 'gr-004',
    name: 'Prompt Injection Guard',
    description: 'Protects against prompt injection attacks',
    type: 'input',
    status: 'active',
    category: 'Security',
    metrics: {
      triggered: 78,
      blocked: 78,
      passed: 0,
      effectiveness: 100
    },
    lastTriggered: '1 hour ago',
    createdAt: '2024-01-08T09:00:00Z'
  },
  {
    id: 'gr-005',
    name: 'Hallucination Check',
    description: 'Validates factual accuracy of generated content',
    type: 'output',
    status: 'active',
    category: 'Accuracy',
    metrics: {
      triggered: 312,
      blocked: 267,
      passed: 45,
      effectiveness: 85.6
    },
    lastTriggered: '30 seconds ago',
    createdAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'gr-006',
    name: 'Rate Limiter',
    description: 'Controls request rate to prevent abuse',
    type: 'input',
    status: 'active',
    category: 'Security',
    metrics: {
      triggered: 45,
      blocked: 45,
      passed: 0,
      effectiveness: 100
    },
    lastTriggered: '3 hours ago',
    createdAt: '2024-01-05T16:00:00Z'
  }
];

export const mockGuardrailsStats: GuardrailsStats = {
  totalGuardrails: 6,
  activeGuardrails: 6,
  totalBlocked: 947,
  totalTriggered: 1025,
  overallEffectiveness: 92.4,
  byCategory: [
    { category: 'Privacy', count: 1, effectiveness: 93.9 },
    { category: 'Safety', count: 1, effectiveness: 97.9 },
    { category: 'Fairness', count: 1, effectiveness: 91.0 },
    { category: 'Security', count: 2, effectiveness: 100 },
    { category: 'Accuracy', count: 1, effectiveness: 85.6 }
  ]
};

export const mockGuardrailsEffectiveness = [
  { name: 'PII Detection', effectiveness: 93.9, triggered: 245 },
  { name: 'Toxicity Filter', effectiveness: 97.9, triggered: 189 },
  { name: 'Bias Detection', effectiveness: 91.0, triggered: 156 },
  { name: 'Prompt Injection', effectiveness: 100, triggered: 78 },
  { name: 'Hallucination Check', effectiveness: 85.6, triggered: 312 },
  { name: 'Rate Limiter', effectiveness: 100, triggered: 45 }
];

export default mockGuardrails;
