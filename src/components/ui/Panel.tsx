import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Panel: React.FC<PanelProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-bg-panel 
        rounded-2xl 
        border border-border-soft 
        shadow-2-5d 
        relative
        overflow-hidden
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-glow hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};