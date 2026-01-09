/**
 * RAIDashboard - Main Responsible AI Dashboard Component
 * 
 * A standalone, embeddable dashboard for Responsible AI monitoring.
 * This component can be imported and used in any React application.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar, { type DashboardSection } from './components/Sidebar';
import {
  OverviewPage,
  GuardrailsDashboard,
  LiveDashboard,
  PolicyDashboard,
  SustainabilityPage,
  PerformancePage
} from './components/pages';

export interface RAIDashboardProps {
  /** Initial section to display */
  initialSection?: DashboardSection;
  /** Callback when section changes */
  onSectionChange?: (section: DashboardSection) => void;
  /** Custom class name for the root element */
  className?: string;
  /** Whether to show the sidebar */
  showSidebar?: boolean;
}

const RAIDashboard: React.FC<RAIDashboardProps> = ({
  initialSection = 'overview',
  onSectionChange,
  className = '',
  showSidebar = true
}) => {
  const [activeSection, setActiveSection] = useState<DashboardSection>(initialSection);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionChange = (section: DashboardSection) => {
    setActiveSection(section);
    onSectionChange?.(section);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewPage onSectionChange={handleSectionChange} />;
      case 'guardrails-section':
        return <GuardrailsDashboard />;
      case 'dashboard':
        return <LiveDashboard />;
      case 'policies':
        return <PolicyDashboard />;
      case 'sustainability-cost':
        return <SustainabilityPage />;
      case 'performance-reliability':
        return <PerformancePage />;
      default:
        return <OverviewPage onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className={`rai-dashboard flex h-screen overflow-hidden ${className}`}>
      {/* Mobile Menu Button */}
      {showSidebar && isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mobile-menu-btn"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Mobile Overlay */}
      {showSidebar && isMobile && (
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div 
          className={`
            flex-shrink-0 z-50 h-full
            transition-transform duration-300 ease-in-out
            ${isMobile ? 'fixed left-0 top-0' : 'relative'}
            ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      )}

      {/* Main Content */}
      <main 
        className={`
          flex-1 overflow-y-auto overflow-x-hidden relative z-10
          ${isMobile && showSidebar ? 'pt-16' : ''}
        `}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default RAIDashboard;
