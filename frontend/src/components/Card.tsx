import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'surface' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-slate-900/70 border border-slate-800 text-slate-100',
    surface: 'bg-slate-950 border border-slate-800/80 text-slate-100',
    glass: 'bg-slate-900/40 backdrop-blur-md border border-slate-800/60 text-slate-100',
  };

  return (
    <div
      className={`rounded-xl p-5 md:p-6 transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
