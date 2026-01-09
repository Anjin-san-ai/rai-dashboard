/**
 * Policy Dashboard - Dark theme version
 * Displays policies management interface
 */

import React, { useState } from 'react';
import { 
  UserCheck, FileSearch, Brain, Shield, MessageSquareWarning, 
  Copyright, Zap, Lock, Plus, Filter, Scale, Gavel, Globe
} from 'lucide-react';
import PageLayout from '../PageLayout';
import PolicyCard from './PolicyCard';

const PolicyDashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'internal' | 'regulatory'>('all');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'USA' | 'Europe'>('all');

  const policyCards = [
    {
      id: 1,
      title: "Bias Detection and Fairness Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "12 Requirements",
      description: "Comprehensive policy framework for detecting and mitigating algorithmic bias in AI systems. Establishes mandatory bias testing protocols, fairness metrics evaluation, and remediation procedures.",
      icon: UserCheck,
      iconColor: "text-success"
    },
    {
      id: 2,
      title: "PII Leakage Prevention Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "8 Requirements",
      description: "Data protection policy designed to prevent personally identifiable information (PII) leakage in AI model outputs. Defines detection mechanisms and data anonymization standards.",
      icon: FileSearch,
      iconColor: "text-primary"
    },
    {
      id: 3,
      title: "AI Hallucination Mitigation Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "6 Requirements",
      description: "Policy framework addressing AI model hallucinations and false information generation. Establishes validation protocols and fact-checking requirements.",
      icon: Brain,
      iconColor: "text-muted-foreground"
    },
    {
      id: 4,
      title: "Content Safety and Moderation Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "15 Requirements",
      description: "Comprehensive content safety policy governing AI-generated content moderation and filtering. Defines prohibited content categories and automated detection systems.",
      icon: Shield,
      iconColor: "text-success"
    },
    {
      id: 5,
      title: "Toxicity Detection Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "9 Requirements",
      description: "Policy framework for identifying and preventing toxic language and harmful content in AI interactions. Establishes toxicity scoring thresholds.",
      icon: MessageSquareWarning,
      iconColor: "text-warning"
    },
    {
      id: 6,
      title: "Copyright and IP Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "11 Requirements",
      description: "Intellectual property protection policy for AI systems to prevent copyright infringement. Defines content attribution requirements and fair use guidelines.",
      icon: Copyright,
      iconColor: "text-primary"
    },
    {
      id: 7,
      title: "Injection Attack Prevention",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "7 Requirements",
      description: "Security policy addressing prompt injection and adversarial attacks on AI systems. Establishes input validation protocols and attack detection mechanisms.",
      icon: Zap,
      iconColor: "text-accent"
    },
    {
      id: 8,
      title: "Privacy Protection Policy",
      organization: "Internal RAI Framework",
      type: "Internal Policy",
      policyType: "internal" as const,
      region: "",
      updated: "Oct 1, 2025",
      requirements: "13 Requirements",
      description: "Comprehensive privacy policy governing data collection and protection in AI systems. Defines user consent requirements and data retention limits.",
      icon: Lock,
      iconColor: "text-success"
    },
    {
      id: 9,
      title: "EU AI Act",
      organization: "European Parliament",
      type: "Law",
      policyType: "regulatory" as const,
      region: "Europe",
      updated: "Sep 30, 2025",
      requirements: "+27",
      description: "The Artificial Intelligence Act establishes a unified regulatory framework for AI in the EU. Adopts a risk-based approach for AI system obligations.",
      icon: Scale,
      iconColor: "text-primary"
    },
    {
      id: 10,
      title: "Digital Markets Act (DMA)",
      organization: "European Commission",
      type: "Law",
      policyType: "regulatory" as const,
      region: "Europe",
      updated: "Oct 17, 2024",
      requirements: "+27",
      description: "The Digital Markets Act aims to make digital sector markets fairer and more contestable. Establishes rules to prevent unfair trading practices.",
      icon: Globe,
      iconColor: "text-accent"
    },
    {
      id: 11,
      title: "National AI Initiative Act",
      organization: "US Congress",
      type: "Law",
      policyType: "regulatory" as const,
      region: "USA",
      updated: "Jun 21, 2024",
      requirements: "+1",
      description: "Establishes the National AI Initiative to coordinate AI research and development across the federal government for economic and national security.",
      icon: Gavel,
      iconColor: "text-muted-foreground"
    }
  ];

  const filteredPolicies = policyCards.filter(policy => {
    const matchesType = selectedFilter === 'all' || policy.policyType === selectedFilter;
    const matchesRegion = selectedRegion === 'all' || policy.region === selectedRegion;
    return matchesType && matchesRegion;
  });

  const filterButtons = [
    { key: 'all', label: 'All', count: policyCards.length },
    { key: 'internal', label: 'Internal', count: policyCards.filter(p => p.policyType === 'internal').length },
    { key: 'regulatory', label: 'Regulatory', count: policyCards.filter(p => p.policyType === 'regulatory').length },
  ];

  const regionButtons = [
    { key: 'all', label: 'All Regions' },
    { key: 'USA', label: 'USA' },
    { key: 'Europe', label: 'Europe' },
  ];

  return (
    <PageLayout>
      {/* Filter Bar */}
      <div className="glass-card p-4 mb-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Type Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Type:</span>
              <div className="flex gap-1.5">
                {filterButtons.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key as 'all' | 'internal' | 'regulatory')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedFilter === filter.key
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-secondary/50 text-muted-foreground border border-border/30 hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {filter.label}
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      selectedFilter === filter.key
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Region Filters */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Region:</span>
              <div className="flex gap-1.5">
                {regionButtons.map((region) => (
                  <button
                    key={region.key}
                    onClick={() => setSelectedRegion(region.key as 'all' | 'USA' | 'Europe')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedRegion === region.key
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-secondary/50 text-muted-foreground border border-border/30 hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button className="glow-button inline-flex items-center gap-2 w-fit">
            <Plus className="w-4 h-4" />
            Create Policy
          </button>
        </div>
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPolicies.map((policy, index) => (
          <div 
            key={policy.id}
            className="animate-fade-in"
            style={{ animationDelay: `${(index % 6) * 50}ms`, opacity: 0 }}
          >
            <PolicyCard
              {...policy}
              onClick={() => console.log('Policy clicked:', policy.title)}
            />
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default PolicyDashboard;
