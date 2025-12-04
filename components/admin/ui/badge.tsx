'use client';

import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        variant === 'default' && 'bg-blue-100 text-blue-700',
        variant === 'secondary' && 'bg-slate-100 text-slate-700',
        variant === 'destructive' && 'bg-red-100 text-red-700',
        variant === 'outline' && 'text-slate-700 border border-slate-200 bg-white',
        className
      )}
      {...props}
    />
  );
}
