import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: ReactNode;
}

const variantClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-sm dark:shadow-none',
  secondary:
    'bg-[#334155] text-[#f8fafc] hover:bg-slate-600 border border-[#334155]',
  outline:
    'bg-transparent border border-[#334155] text-slate-300 hover:bg-slate-800/60',
  ghost: 'bg-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-[#f8fafc]',
  destructive: 'bg-red-600 text-white hover:bg-red-500 border border-transparent',
};

const sizeClass: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs rounded-radius-s gap-1.5',
  md: 'h-10 px-4 text-sm rounded-radius-m gap-2',
  lg: 'h-11 px-5 text-sm rounded-radius-m gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || isLoading);
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-colors',
          'disabled:pointer-events-none',
          isLoading && 'opacity-[0.85] cursor-wait',
          disabled && !isLoading && 'opacity-50',
          variantClass[variant],
          sizeClass[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
