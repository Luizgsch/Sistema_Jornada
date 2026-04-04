import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import type { AlertData } from "@/shared/types";
import { motion } from "framer-motion";
import { Clock, FileWarning, TrendingUp, Calendar, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface AlertPanelProps {
  alerts: AlertData[];
}

const iconMap: Record<string, any> = {
  Clock,
  FileWarning,
  TrendingUp,
  Calendar,
};

export function AlertPanel({ alerts }: AlertPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="h-full">
      <CardHeader className="pb-3 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Painel de Alertas
          </CardTitle>
          <span className="text-[10px] md:text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
            6 Ativos
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-3 md:px-6">
        <div className="space-y-3">

            {alerts.map((alert, index) => {
              const Icon = iconMap[alert.icon] || AlertCircle;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-all cursor-pointer",
                    alert.priority === "high" && "bg-rose-50/50 dark:bg-rose-900/10",
                    alert.priority === "medium" && "bg-amber-50/50 dark:bg-amber-900/10"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      alert.priority === "high" ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30" : 
                      alert.priority === "medium" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30" :
                      "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                    )}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.date}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
