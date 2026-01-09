/**
 * Policy Card Component - Dark theme version
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PolicyCardProps {
  title: string;
  organization: string;
  type: string;
  policyType: 'internal' | 'regulatory';
  region?: string;
  updated: string;
  requirements: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  onClick?: () => void;
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  title,
  organization,
  type,
  policyType,
  region,
  updated,
  requirements,
  description,
  icon: Icon,
  iconColor,
  onClick
}) => {
  return (
    <div 
      className="glass-card p-5 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/30 group-hover:border-primary/30 transition-colors">
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1 truncate">{organization}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
          policyType === 'internal' 
            ? 'bg-primary/15 text-primary border border-primary/20' 
            : 'bg-accent/15 text-accent border border-accent/20'
        }`}>
          {type}
        </span>
        {region && (
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-success/15 text-success border border-success/20">
            {region}
          </span>
        )}
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-secondary text-muted-foreground border border-border/30">
          {requirements}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <span className="text-[10px] text-muted-foreground/70">Updated: {updated}</span>
        <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;
