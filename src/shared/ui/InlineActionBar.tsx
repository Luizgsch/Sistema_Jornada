import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';

interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'blue' | 'orange' | 'green' | 'red';
  disabled?: boolean;
}

interface InlineActionBarProps {
  selectedCount: number;
  actions: ActionButtonProps[];
  onClear?: () => void;
  className?: string;
}

const buttonVariants: Record<string, { variant: 'primary' | 'secondary'; className: string }> = {
  blue: {
    variant: 'secondary',
    className: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700',
  },
  orange: {
    variant: 'secondary',
    className: 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/40 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
  },
  green: {
    variant: 'secondary',
    className: 'bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700',
  },
  red: {
    variant: 'secondary',
    className: 'bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
  },
};

export const InlineActionBar = ({
  selectedCount,
  actions,
  onClear,
  className,
}: InlineActionBarProps) => {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'mt-3 px-4 py-3 bg-blue-50 dark:bg-slate-900/50 border border-blue-200 dark:border-slate-700 rounded-lg flex items-center gap-3 flex-wrap',
            className
          )}
        >
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {selectedCount} {selectedCount === 1 ? 'item' : 'itens'} selecionado{selectedCount === 1 ? '' : 's'}
          </span>

          <div className="flex-1" />

          <div className="flex items-center gap-2 flex-wrap">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="secondary"
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  'gap-1.5',
                  buttonVariants[action.variant || 'blue']?.className
                )}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}

            {onClear && (
              <button
                onClick={onClear}
                className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                aria-label="Limpar seleção"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
