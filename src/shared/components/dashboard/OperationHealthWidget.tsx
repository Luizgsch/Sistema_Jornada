import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/shared/lib/cn";
export type OperationHealthStatus = "ok" | "atencao" | "critico";

const ring: Record<OperationHealthStatus, string> = {
  ok: "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]",
  atencao: "bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.25)]",
  critico: "bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.25)]",
};

type OperationHealthWidgetProps = {
  status: OperationHealthStatus;
  titulo: string;
  detalhe: string;
  delay?: number;
  className?: string;
};

export function OperationHealthWidget({
  status,
  titulo,
  detalhe,
  delay = 0,
  className,
}: OperationHealthWidgetProps) {
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
        className
      )}
    >
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Saúde da operação
        </p>
        <Activity size={12} className="text-zinc-400" aria-hidden />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <span
          className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full sm:mt-2", ring[status])}
          title={status}
        />
        <div className="min-w-0 flex-1 sm:max-w-none lg:max-w-[min(100%,28rem)] xl:max-w-none">
          <p className="text-lg font-bold leading-tight text-zinc-800 dark:text-[#e7e5e4]">{titulo}</p>
          <p className="mt-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-500">{detalhe}</p>
        </div>
      </div>
    </motion.div>
  );
}
