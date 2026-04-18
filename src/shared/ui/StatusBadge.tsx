import { cn } from "@/shared/lib/cn";
import { getStatusPresentation } from "@/shared/lib/recrutamentoStatusStyles";

interface StatusBadgeProps {
  status: string;
  className?: string;
  /** Cabeçalho de card / destaque: maior e mais contraste. */
  emphasis?: "default" | "prominent";
}

export function StatusBadge({ status, className, emphasis = "default" }: StatusBadgeProps) {
  const { label, badgeClass } = getStatusPresentation(String(status));

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-radius-m font-semibold border transition-colors duration-300",
        emphasis === "prominent"
          ? "text-sm px-3.5 py-1.5 border-2 shadow-md shadow-black/15 dark:shadow-black/40"
          : "text-xs px-2.5 py-0.5",
        badgeClass,
        className
      )}
    >
      {label}
    </span>
  );
}
