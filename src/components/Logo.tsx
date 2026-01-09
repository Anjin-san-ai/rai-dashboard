/**
 * Logo - RAI Dashboard brand logo with dark theme support
 */

import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const isDark = variant === 'dark';

  return (
    <div className="flex items-center gap-3">
      {/* Shield Icon with gradient */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg className="w-full h-full" fill="none" viewBox="0 0 40 40">
          {/* Glow effect */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Shield shape */}
          <path 
            d="M20 3L6 8v10c0 8.284 5.716 15.284 14 17 8.284-1.716 14-8.716 14-17V8L20 3z" 
            fill="url(#logoGradient)"
            opacity="0.9"
            filter="url(#glow)"
          />
          
          {/* Inner shield highlight */}
          <path 
            d="M20 6L9 10v8c0 6.627 4.373 12.627 11 14 6.627-1.373 11-7.373 11-14v-8L20 6z" 
            fill={isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.2)"}
          />
          
          {/* AI circuit pattern */}
          <g stroke={isDark ? "#e2e8f0" : "#ffffff"} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9">
            {/* Center node */}
            <circle cx="20" cy="18" r="3" fill={isDark ? "#e2e8f0" : "#ffffff"} />
            
            {/* Connection lines */}
            <path d="M20 21v5" />
            <path d="M17 16l-4-4" />
            <path d="M23 16l4-4" />
            
            {/* Outer nodes */}
            <circle cx="13" cy="12" r="2" fill={isDark ? "#e2e8f0" : "#ffffff"} />
            <circle cx="27" cy="12" r="2" fill={isDark ? "#e2e8f0" : "#ffffff"} />
            <circle cx="20" cy="26" r="2" fill={isDark ? "#e2e8f0" : "#ffffff"} />
          </g>
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} ${isDark ? 'text-foreground' : 'text-gray-800'} leading-tight`}>
          <span className="gradient-text">Responsible</span>
          <span className={isDark ? ' text-foreground' : ' text-gray-800'}> AI</span>
        </span>
        <span className={`text-xs ${isDark ? 'text-muted-foreground' : 'text-gray-500'} font-medium tracking-wide`}>
          Dashboard
        </span>
      </div>
    </div>
  );
};

export default Logo;
