/**
 * PageLayout - Responsive page wrapper with dark theme
 */

import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  className = '' 
}) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header Bar */}
      {title && (
        <header className="flex-shrink-0 px-6 py-4 border-b border-border/30 bg-background/50 backdrop-blur-sm">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </header>
      )}
      
      {/* Scrollable Content Area */}
      <div 
        className={`
          flex-1 overflow-y-auto overflow-x-hidden
          px-4 sm:px-6 py-6
          ${className}
        `}
      >
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
