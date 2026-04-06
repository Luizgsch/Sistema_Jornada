import { AlertTriangle, AlertCircle, Info, ArrowRight, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';

export type ActionSeverity = 'critical' | 'warning' | 'info';

export interface CriticalAction {
  id: string;
  severity: ActionSeverity;
  title: string;
  description: string;
  count?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface CriticalActionsBarProps {
  actions: CriticalAction[];
  className?: string;
}

const severityConfig: Record<ActionSeverity, {
  icon: typeof AlertTriangle;
  containerClass: string;
  iconClass: string;
  badgeClass: string;
  dotClass: string;
}> = {
  critical: {
    icon: AlertCircle,
    containerClass: 'border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/8',
    iconClass: 'text-rose-500 dark:text-rose-400',
    badgeClass: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
    dotClass: 'bg-rose-500 dark:bg-rose-400',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/8',
    iconClass: 'text-amber-600 dark:text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    dotClass: 'bg-amber-500 dark:bg-amber-400',
  },
  info: {
    icon: Info,
    containerClass: 'border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/8',
    iconClass: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
    dotClass: 'bg-blue-500 dark:bg-blue-400',
  },
};

export function CriticalActionsBar({ actions, className }: CriticalActionsBarProps) {
  if (actions.length === 0) return null;

  const criticalCount = actions.filter((a) => a.severity === 'critical').length;
  const warningCount = actions.filter((a) => a.severity === 'warning').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('space-y-3', className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Bell className="text-zinc-500 dark:text-zinc-400" size={16} />
            {criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </div>
          <span className="text-sm font-bold text-zinc-800 dark:text-[#e7e5e4] uppercase tracking-wider">
            Ações Necessárias
          </span>
          <div className="flex items-center gap-1.5">
            {criticalCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                {criticalCount} crítico{criticalCount > 1 ? 's' : ''}
              </span>
            )}
            {warningCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                {warningCount} alerta{warningCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action, i) => {
          const cfg = severityConfig[action.severity];
          const Icon = cfg.icon;

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl border transition-colors duration-300',
                cfg.containerClass,
                action.action && 'cursor-pointer hover:brightness-105'
              )}
              onClick={action.action?.onClick}
            >
              <div className="shrink-0 mt-0.5">
                <Icon size={16} className={cfg.iconClass} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-semibold text-zinc-800 dark:text-[#e7e5e4] leading-tight">
                    {action.count !== undefined && (
                      <span className={cn('inline-flex items-center justify-center w-5 h-5 rounded-md text-[11px] font-black mr-1.5 border', cfg.badgeClass)}>
                        {action.count}
                      </span>
                    )}
                    {action.title}
                  </p>
                  {action.action && (
                    <ArrowRight size={13} className={cn('shrink-0 mt-0.5', cfg.iconClass)} />
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{action.description}</p>
                {action.action && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); action.action?.onClick(); }}
                    className={cn('mt-1.5 text-[11px] font-semibold flex items-center gap-1', cfg.iconClass)}
                  >
                    {action.action.label}
                    <ArrowRight size={10} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
