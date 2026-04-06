import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

const TOAST_DURATION: Record<ToastType, number> = {
  success: 4000,
  info: 4000,
  warning: 6000,
  error: 7000,
};

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (props: Omit<ToastMessage, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((props: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...props }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION[props.type] ?? 4000);
  }, []);

  const success = useCallback(
    (title: string, description?: string) => addToast({ type: 'success', title, description }),
    [addToast]
  );
  const error = useCallback(
    (title: string, description?: string) => addToast({ type: 'error', title, description }),
    [addToast]
  );
  const info = useCallback(
    (title: string, description?: string) => addToast({ type: 'info', title, description }),
    [addToast]
  );
  const warning = useCallback(
    (title: string, description?: string) => addToast({ type: 'warning', title, description }),
    [addToast]
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      {/* On mobile: positioned above the BottomNav (bottom-[76px]). On desktop: bottom-6 right-6 */}
      <div className="fixed bottom-[76px] md:bottom-6 right-3 md:right-6 z-[200] flex flex-col gap-2.5 pointer-events-none w-[calc(100vw-24px)] md:w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  const config = {
    success: {
      icon: <CheckCircle2 size={18} />,
      iconClass: 'text-emerald-400',
      accent: 'border-l-emerald-500/60',
      progress: 'bg-emerald-500',
    },
    error: {
      icon: <AlertCircle size={18} />,
      iconClass: 'text-red-400',
      accent: 'border-l-red-500/60',
      progress: 'bg-red-500',
    },
    warning: {
      icon: <AlertTriangle size={18} />,
      iconClass: 'text-amber-400',
      accent: 'border-l-amber-500/60',
      progress: 'bg-amber-500',
    },
    info: {
      icon: <Info size={18} />,
      iconClass: 'text-blue-400',
      accent: 'border-l-blue-500/60',
      progress: 'bg-blue-500',
    },
  }[toast.type];

  const duration = TOAST_DURATION[toast.type] ?? 4000;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`relative w-full overflow-hidden rounded-xl border border-[#27272a] border-l-4 ${config.accent} bg-[#18181b] pointer-events-auto flex items-start gap-3 p-4 shadow-xl shadow-black/30`}
    >
      <div className={`mt-0.5 flex-shrink-0 ${config.iconClass}`}>{config.icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#e7e5e4] leading-snug">{toast.title}</h4>
        {toast.description && (
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="p-1 text-zinc-600 hover:text-zinc-300 rounded-md transition-colors flex-shrink-0 mt-0.5"
      >
        <X size={14} />
      </button>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        style={{ transformOrigin: 'left' }}
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${config.progress} opacity-50`}
      />
    </motion.div>
  );
}
