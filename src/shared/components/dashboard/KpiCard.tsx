import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/Card";
import type { KpiData } from "@/shared/types";
import { cn } from "@/shared/lib/cn";

interface KpiCardProps extends KpiData {
  delay?: number;
}

export function KpiCard({ label, value, change, trend, delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {change !== undefined && (
                <div
                  className={cn(
                    "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
                    trend === "up" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                    trend === "down" && "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
                    trend === "neutral" && "bg-slate-50 text-slate-600 dark:bg-slate-900/20 dark:text-slate-400"
                  )}
                >
                  {trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : trend === "down" ? (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <div 
          className={cn(
            "h-1.5 w-full",
            trend === "up" ? "bg-emerald-500" : trend === "down" ? "bg-rose-500" : "bg-primary"
          )} 
        />
      </Card>
    </motion.div>
  );
}
