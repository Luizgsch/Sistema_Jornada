import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  /** Rótulo discreto acima do valor */
  label: string;
  value: string | number;
  /** Texto auxiliar abaixo do delta */
  hint?: string;
  delta?: {
    text: string;
    positive?: boolean;
  };
  icon?: LucideIcon;
  iconClassName?: string;
  delay?: number;
  className?: string;
};

export function StatCard({
  label,
  value,
  hint,
  delta,
  icon: Icon,
  iconClassName,
  delay = 0,
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "rounded-radius-l border p-4 sm:p-5",
        "bg-white dark:bg-zinc-900",
        "border-zinc-100 dark:border-zinc-800",
        "shadow-sm dark:shadow-none",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-indigo-300/50 dark:hover:border-indigo-500/35",
        "flex h-full flex-col gap-2 xl:flex-row xl:items-start xl:justify-between xl:gap-4",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-3xl font-bold tabular-nums tracking-tight text-zinc-800 dark:text-white">
              {value}
            </p>
            <p className="mt-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">{label}</p>
          </div>
          {Icon && (
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-radius-m bg-zinc-100 dark:bg-zinc-800/80",
                iconClassName
              )}
            >
              <Icon size={14} className="text-zinc-500 dark:text-zinc-400" />
            </div>
          )}
        </div>
        {delta && (
          <p
            className={cn(
              "mt-1 inline-flex w-fit rounded-radius-m px-1.5 py-0.5 text-[11px] font-semibold",
              delta.positive === true &&
                "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
              delta.positive === false &&
                "bg-rose-500/10 text-rose-700 dark:text-rose-400",
              delta.positive === undefined && "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
            )}
          >
            {delta.text}
          </p>
        )}
      </div>
      {hint && (
        <p className="text-[11px] leading-snug text-zinc-500 dark:text-zinc-500 xl:max-w-[13rem] xl:shrink-0 xl:text-right">
          {hint}
        </p>
      )}
    </motion.div>
  );
}
