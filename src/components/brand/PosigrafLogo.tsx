import { cn } from '@/utils/cn';

type PosigrafLogoProps = {
  /** compact = só símbolo; full = símbolo + wordmark */
  variant?: 'compact' | 'full';
  className?: string;
  /** texto claro (sidebar escura) */
  inverted?: boolean;
};

/**
 * Marca inspirada no contexto da Posigraf (gráfica, precisão, sustentabilidade).
 * Não reproduz logotipo oficial — uso adequado a protótipo / demonstração.
 */
export function PosigrafLogo({ variant = 'full', className, inverted }: PosigrafLogoProps) {
  const fg = inverted ? '#f8fafc' : '#0f172a';
  const accent = '#0d9488';
  const sub = inverted ? 'rgba(248,250,252,0.55)' : '#64748b';

  return (
    <div className={cn('flex items-center gap-2.5 select-none', className)} aria-label="Posigraf">
      <svg
        width={variant === 'compact' ? 36 : 40}
        height={variant === 'compact' ? 36 : 40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden
      >
        <rect width="40" height="40" rx="10" fill={inverted ? 'rgba(255,255,255,0.08)' : '#f1f5f9'} />
        <path
          d="M12 28V12h7.2c3.3 0 5.6 2.1 5.6 5.1 0 2.05-1 3.65-2.75 4.45L25.2 28h-3.55l-2.5-5.65h-4.45V28H12zm6.95-8.35c1.45 0 2.35-.85 2.35-2.15 0-1.35-.9-2.2-2.4-2.2h-3.35v4.35h3.4z"
          fill={fg}
        />
        <path d="M26 12h2v3.2h-2V12z" fill={accent} />
        <path d="M26 17.2h2V28h-2V17.2z" fill={accent} opacity={0.85} />
      </svg>
      {variant === 'full' && (
        <div className="flex flex-col leading-tight min-w-0">
          <span className={cn('font-extrabold tracking-tight text-base sm:text-lg truncate', inverted ? 'text-white' : 'text-slate-900')}>
            Posigraf
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider truncate" style={{ color: sub }}>
            Sistema integrado
          </span>
        </div>
      )}
    </div>
  );
}
