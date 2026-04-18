import { cn } from "@/shared/lib/cn";

interface PulseBadgeProps {
  /** ISO date string (YYYY-MM-DD) or DD/MM/YYYY */
  dueDate: string;
  /** Optional custom label — defaults to contextual text */
  label?: string;
  className?: string;
}

function parseDate(dateStr: string): Date {
  const iso = new Date(dateStr);
  if (!isNaN(iso.getTime())) return iso;
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
}

export function PulseBadge({ dueDate, label, className }: PulseBadgeProps) {
  const due = parseDate(dueDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const isOverdue = due < now;
  const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isWarning = !isOverdue && daysUntilDue <= 3;

  if (isOverdue) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-radius-m text-xs font-semibold border",
          "bg-red-500/10 text-red-400 border-red-500/20",
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        {label ?? "Vencido"}
      </span>
    );
  }

  if (isWarning) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-radius-m text-xs font-semibold border",
          "bg-amber-500/10 text-amber-400 border-amber-500/20",
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        {label ?? (daysUntilDue === 0 ? "Vence hoje" : `Vence em ${daysUntilDue}d`)}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-radius-m text-xs font-semibold border",
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        className
      )}
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
      {label ?? "No prazo"}
    </span>
  );
}
