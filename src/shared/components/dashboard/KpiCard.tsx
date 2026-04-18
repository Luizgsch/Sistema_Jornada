import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import type { KpiData } from "@/shared/types";
import { cn } from "@/shared/lib/cn";

interface KpiCardProps extends KpiData {
  delay?: number;
  urgency?: "critical" | "warning" | "normal";
}

export function KpiCard({ label, value, change, trend, delay = 0, urgency }: KpiCardProps) {
  const isCritical = urgency === "critical";
  const isWarning = urgency === "warning";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="w-full"
    >
      <div
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-radius-l border p-5 flex flex-col gap-3 overflow-hidden relative",
          "transition-all duration-300 ease-out hover:scale-[1.02] cursor-pointer",
          isCritical
            ? "border-zinc-200 dark:border-zinc-800 border-l-4 border-l-red-600/70 ring-1 ring-red-500/20"
            : "",
          isWarning
            ? "border-zinc-200 dark:border-zinc-800 border-l-4 border-l-amber-500/60"
            : "",
          !isCritical && !isWarning
            ? "border-zinc-100 dark:border-zinc-800 hover:border-indigo-300/50 dark:hover:border-indigo-500/30 shadow-sm dark:shadow-none hover:shadow-md"
            : ""
        )}
      >
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest leading-tight">
          {label}
        </p>
        <div className="flex items-end justify-between gap-2">
          <h3
            className={cn(
              "text-3xl font-bold tracking-tight leading-none",
              isCritical ? "neon-error" : "text-zinc-800 dark:text-[#e7e5e4]"
            )}
          >
            {value}
          </h3>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center text-xs font-semibold px-2 py-0.5 rounded-radius-m mb-0.5",
                trend === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                trend === "down" && "bg-red-500/10 text-red-600 dark:text-red-400",
                trend === "neutral" && "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
              )}
            >
              {trend === "up" ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : trend === "down" ? (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              ) : (
                <Minus className="w-3 h-3 mr-0.5" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
