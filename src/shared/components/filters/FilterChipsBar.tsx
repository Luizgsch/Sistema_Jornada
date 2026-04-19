import type { FC } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";

export type FilterChipModel = {
  id: string;
  label: string;
  onRemove: () => void;
};

type FilterChipsBarProps = {
  chips: FilterChipModel[];
  onClearAll: () => void;
  className?: string;
};

export const FilterChipsBar: FC<FilterChipsBarProps> = ({ chips, onClearAll, className }) => {
  if (chips.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2.5 dark:border-[#334155] dark:bg-[#0f172a]/60",
        className
      )}
      role="region"
      aria-label="Filtros ativos"
    >
      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 shrink-0">
        Filtros ativos
      </span>
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        {chips.map((chip) => (
          <span
            key={chip.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
          >
            <span className="max-w-[220px] truncate">{chip.label}</span>
            <button
              type="button"
              onClick={chip.onRemove}
              className="rounded-full p-0.5 text-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={`Remover filtro: ${chip.label}`}
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </span>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="ml-auto h-auto shrink-0 px-2 py-1 text-xs font-bold uppercase tracking-wide text-rose-600 hover:text-rose-700 hover:underline dark:text-rose-400 dark:hover:bg-transparent dark:hover:text-rose-300"
      >
        Limpar filtros
      </Button>
    </div>
  );
};
