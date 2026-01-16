import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-bg-elevated text-accent-primary border border-border-strong shadow-2-5d hover:shadow-glow hover:text-white hover:border-accent-primary/50",
    secondary: "bg-transparent text-text-muted border border-border-soft hover:bg-bg-elevated hover:text-text-primary hover:border-border-strong",
    danger: "bg-red-900/10 text-red-400 border border-red-900/30 shadow-sm hover:bg-red-900/20 hover:border-red-500/50"
  };

  const sizes = {
    sm: "px-4 py-2 rounded-lg text-xs tracking-wide",
    md: "px-6 py-3 rounded-xl text-sm",
    lg: "px-8 py-4 rounded-xl text-base font-semibold"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};