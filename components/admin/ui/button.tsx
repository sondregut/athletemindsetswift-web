'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          // Variants
          variant === 'default' && 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
          variant === 'destructive' && 'bg-red-500 text-white shadow-sm hover:bg-red-600',
          variant === 'outline' && 'border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50',
          variant === 'ghost' && 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          variant === 'link' && 'text-blue-600 underline-offset-4 hover:underline',
          // Sizes
          size === 'default' && 'h-9 px-4 py-2',
          size === 'sm' && 'h-8 rounded-md px-3 text-xs',
          size === 'lg' && 'h-10 rounded-lg px-8',
          size === 'icon' && 'h-9 w-9',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
