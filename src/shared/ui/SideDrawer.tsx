import type { FC, ReactNode } from "react";
import { useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { cn } from "@/shared/lib/cn";

export type SideDrawerOverlay = "subtle" | "transparent";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Fundo ao clicar fora: sutil (padrão) ou transparente (mantém contexto da lista). */
  overlay?: SideDrawerOverlay;
  /** z-index base do painel (backdrop usa base-1). */
  zIndex?: number;
  className?: string;
}

export const SideDrawer: FC<SideDrawerProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  overlay = "subtle",
  zIndex = 100,
  className,
}) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && overlay !== "transparent") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [open, overlay]);

  const backdropClass =
    overlay === "transparent"
      ? "bg-transparent pointer-events-none"
      : "bg-black/25 dark:bg-black/35 backdrop-blur-[2px]";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={overlay === "transparent" ? undefined : onClose}
            style={{ zIndex: zIndex - 1 }}
            className={cn(
              "fixed inset-0",
              backdropClass,
              overlay === "transparent" ? "" : "cursor-pointer"
            )}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            style={{ zIndex }}
            className={cn(
              "fixed right-0 top-0 bottom-0 flex h-[100dvh] max-h-screen flex-col",
              "w-full min-w-0 border-l border-zinc-200 bg-white shadow-2xl dark:border-[#334155] dark:bg-[#1e293b]",
              "rounded-tl-radius-l rounded-bl-radius-l",
              "sm:max-w-md md:max-w-none md:w-[min(38vw,32rem)]",
              "transition-colors duration-300",
              className
            )}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4 dark:border-[#334155] dark:bg-[#0f172a]">
              <div className="min-w-0 flex-1">
                <h2
                  id={titleId}
                  className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
                >
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{subtitle}</p>
                ) : null}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 rounded-radius-s p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    aria-label="Fechar painel"
                  >
                    <X size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Fechar</TooltipContent>
              </Tooltip>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 custom-scrollbar">
              {children}
            </div>

            {footer ? (
              <div className="shrink-0 border-t border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-[#334155] dark:bg-[#0f172a]">
                {footer}
              </div>
            ) : null}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
