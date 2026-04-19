import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { UiImportance } from '@/shared/ui/uiImportance';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'low';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: ReactNode;
  /** `low`: tons neutros; desvia `primary`/`secondary` para estilo discreto (engajamento). */
  importance?: UiImportance;
}

const variantClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  /** Único destaque por contexto — ação principal (happy path). */
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-sm ' +
    'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] dark:ring-1 dark:ring-white/12',
  /** Alternativa visível, sem competir com o primário (borda / superfície neutra). */
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200/95 border border-zinc-300 ' +
    'dark:bg-zinc-800/40 dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-700/55',
  outline:
    'bg-transparent border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 ' +
    'hover:bg-zinc-100 dark:hover:bg-zinc-800/55',
  /** Cancelar, fechar, limpar — peso visual mínimo; contraste legível no escuro. */
  ghost:
    'bg-transparent border border-transparent text-zinc-600 dark:text-zinc-300 ' +
    'hover:bg-zinc-100/90 dark:hover:bg-zinc-800/65 hover:text-zinc-900 dark:hover:text-zinc-50',
  destructive:
    'bg-red-600 text-white hover:bg-red-500 border border-transparent ' +
    'dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] dark:ring-1 dark:ring-red-400/25',
  low: 'bg-zinc-100/80 dark:bg-zinc-800/20 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600/70 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/45 shadow-none',
};

const sizeClass: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs rounded-radius-s gap-1.5',
  md: 'h-10 px-4 text-sm rounded-radius-m gap-2',
  lg: 'h-11 px-5 text-sm rounded-radius-m gap-2',
};

function resolveVariant(
  variant: NonNullable<ButtonProps['variant']>,
  importance: UiImportance | undefined
): NonNullable<ButtonProps['variant']> {
  if (importance !== 'low') return variant;
  if (variant === 'ghost' || variant === 'destructive') return variant;
  if (variant === 'outline' || variant === 'low') return variant;
  return 'low';
}

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
      importance = 'default',
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || isLoading);
    const visualVariant = resolveVariant(variant, importance);
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
          variantClass[visualVariant],
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
