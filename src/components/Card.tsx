/**
 * Card - Glassmorphism card component for dark theme
 */

import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  value?: string | number;
  subtitle?: string;
  onClick?: () => void;
  variant?: 'default' | 'stat' | 'glow';
  animate?: boolean;
  animationDelay?: number;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title,
  icon,
  value,
  subtitle,
  onClick,
  variant = 'default',
  animate = true,
  animationDelay = 0,
  style: customStyle
}) => {
  const baseClasses = `
    glass-card
    ${variant === 'glow' ? 'hover:shadow-glow' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${animate ? 'animate-fade-in' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const animationStyle = animate && animationDelay > 0 
    ? { animationDelay: `${animationDelay}ms`, opacity: 0 } 
    : undefined;

  const style = customStyle ? { ...animationStyle, ...customStyle } : animationStyle;

  const CardContent = () => (
    <>
      {/* Header with title/icon/value */}
      {(title || icon || value) && (
        <div className="flex items-start gap-3 p-5">
          {icon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <p className="text-sm font-medium text-muted-foreground tracking-tight">
                {title}
              </p>
            )}
            {value && (
              <div className="text-2xl font-bold text-foreground font-mono tracking-tight mt-1">
                {value}
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground/70 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Children content */}
      {children && (
        <div className={title || icon || value ? '' : 'p-5'}>
          {children}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        style={style}
      >
        <CardContent />
      </button>
    );
  }

  return (
    <div className={baseClasses} style={style}>
      <CardContent />
    </div>
  );
};

export default Card;
