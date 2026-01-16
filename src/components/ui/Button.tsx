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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 active:shadow-inset disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-bg-elevated text-accent-primary border border-border-strong shadow-2-5d hover:shadow-glow hover:text-white",
    secondary: "bg-transparent text-text-muted border border-border-soft hover:bg-bg-elevated hover:text-text-primary",
    danger: "bg-red-900/20 text-red-400 border border-red-900/50 shadow-sm hover:bg-red-900/40"
  };

  const sizes = {
    sm: "px-4 py-2 rounded-lg text-sm",
    md: "px-6 py-3 rounded-xl text-base",
    lg: "px-8 py-4 rounded-2xl text-lg"
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