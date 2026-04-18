import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md"
}) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  const maxWClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWClass} bg-white dark:bg-[#1e293b] border border-zinc-200 dark:border-[#334155] rounded-radius-l flex flex-col max-h-[90vh] overflow-hidden transition-colors duration-300`}
          >
            <div className="p-6 border-b border-zinc-200 dark:border-[#334155] flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tighter text-zinc-800 dark:text-[#f8fafc]">{title}</h2>
                {description && (
                  <p className="text-sm text-zinc-500 dark:text-slate-400 mt-1">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-radius-m transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              {children}
            </div>

            {footer && (
              <div className="p-5 border-t border-zinc-200 dark:border-[#334155] bg-zinc-50 dark:bg-[#0f172a] text-zinc-600 dark:text-slate-400 flex items-center justify-end gap-3 rounded-b-radius-l">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
