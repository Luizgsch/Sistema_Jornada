import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    destructive: "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
    outline: "text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800", className)}>
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
