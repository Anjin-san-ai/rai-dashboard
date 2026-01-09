/**
 * Sidebar - Navigation for Responsible AI Dashboard
 * Obsidian Glass Theme with collapsible mobile support
 */

import React from 'react';
import { 
  Home, 
  Activity, 
  Shield, 
  Leaf, 
  FileText,
  Zap
} from 'lucide-react';
import Logo from './Logo';

export type DashboardSection = 
  | 'overview' 
  | 'dashboard'
  | 'guardrails-section'
  | 'performance-reliability' 
  | 'sustainability-cost' 
  | 'policies';

interface SidebarItem {
  id: DashboardSection;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange
}) => {
  const sidebarItems: SidebarItem[] = [
    { 
      id: 'overview', 
      label: 'Home', 
      icon: <Home size={18} />,
      description: 'Dashboard home and overview'
    },
    { 
      id: 'policies', 
      label: 'Policies', 
      icon: <FileText size={18} />,
      description: 'Policy management and documentation'
    },
    { 
      id: 'guardrails-section', 
      label: 'Guardrails', 
      icon: <Shield size={18} />,
      description: 'Guardrail configuration and management'
    },
    { 
      id: 'dashboard', 
      label: 'Live Dashboard', 
      icon: <Activity size={18} />,
      description: 'Guardrail monitoring and health metrics'
    },
    { 
      id: 'performance-reliability', 
      label: 'Performance', 
      icon: <Zap size={18} />,
      description: 'System performance metrics and reliability'
    },
    { 
      id: 'sustainability-cost', 
      label: 'Sustainability', 
      icon: <Leaf size={18} />,
      description: 'Environmental impact and cost optimization'
    }
  ];

  return (
    <aside className="sidebar-glass w-64 h-full flex flex-col">
      {/* Header with Logo */}
      <div className="px-5 py-6 flex-shrink-0">
        <Logo variant="dark" size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <div className="space-y-1">
          {sidebarItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-item animate-slide-in stagger-${index + 1} ${
                activeSection === item.id ? 'active' : ''
              }`}
              title={item.description}
            >
              <span className={`nav-icon flex-shrink-0 transition-colors ${
                activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.icon}
              </span>
              <span className="flex-1 truncate">{item.label}</span>
              {activeSection === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border/30 flex-shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">All systems operational</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
