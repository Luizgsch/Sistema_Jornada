import type { FC, ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Ícone à esquerda do CTA; omitido = "+". Use `hideActionIcon` para nenhum ícone. */
  actionIcon?: ReactNode;
  hideActionIcon?: boolean;
  /** Estado positivo (ex.: sem pendências). */
  variant?: "default" | "success";
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
  hideActionIcon = false,
  variant = "default",
  className,
}) => {
  const isSuccess = variant === "success";
  const ctaLeading =
    hideActionIcon ? null : actionIcon !== undefined ? actionIcon : <Plus size={15} className="shrink-0 opacity-90" />;

  return (
    <div
      className={cn(
        "w-full min-h-[220px] py-12 px-6 rounded-radius-l flex flex-col items-center justify-center text-center transition-colors duration-300",
        isSuccess
          ? "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] border border-dashed border-emerald-500/20 dark:border-emerald-500/25"
          : "bg-white dark:bg-[#1e293b] border border-dashed border-zinc-200 dark:border-[#334155]",
        className
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-radius-m flex items-center justify-center mb-5 border [&>svg]:opacity-55 dark:[&>svg]:opacity-50",
          isSuccess
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400/80 border-emerald-500/20"
            : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-violet-300/45 border-zinc-200 dark:border-[#334155]"
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          "text-lg font-semibold tracking-tight mb-2",
          isSuccess ? "text-emerald-800 dark:text-emerald-100" : "text-zinc-800 dark:text-[#e7e5e4]"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm text-zinc-500 dark:text-zinc-500 max-w-md leading-relaxed text-balance",
          actionLabel && onAction ? "mb-6" : "mb-0"
        )}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-radius-m text-sm font-semibold transition-all border",
            isSuccess
              ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              : "bg-zinc-50 dark:bg-[#0f172a] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-[#334155] hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-primary hover:border-primary/30"
          )}
        >
          {ctaLeading}
          {actionLabel}
        </button>
      )}
    </div>
  );
};
