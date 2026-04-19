import type { FC, ReactNode } from "react";
import { Search, Filter, ArrowUpDown, Download, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { Button } from "@/shared/ui/Button";

interface FiltersBarProps {
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  /** Substitui o campo de busca padrão (ex.: auto-complete). */
  searchSlot?: ReactNode;
  onFilterClick?: () => void;
  filterLabel?: string;
  children?: React.ReactNode;
  /**
   * Exportação só deve aparecer onde há dados em massa / integração (ex.: colaboradores, folha).
   * Padrão false para não poluir listas operacionais.
   */
  showExport?: boolean;
  exportLabel?: string;
  onExportClick?: () => void;
  exportDisabled?: boolean;
  exportLoading?: boolean;
}

export const FiltersBar: FC<FiltersBarProps> = ({
  searchPlaceholder = "Buscar...",
  onSearch,
  searchSlot,
  onFilterClick,
  filterLabel = "Filtros",
  children,
  showExport = false,
  exportLabel = "Exportar",
  onExportClick,
  exportDisabled = false,
  exportLoading = false,
}) => {
  return (
    <div className="w-full bg-white dark:bg-[#1e293b] p-4 border border-zinc-200 dark:border-[#334155] rounded-radius-l mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300">
      <div className="relative w-full sm:max-w-md">
        {searchSlot ? (
          searchSlot
        ) : (
          <>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-slate-500 pointer-events-none z-[1]" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 h-10 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-zinc-50 dark:bg-[#0f172a] px-3 py-2 text-sm font-medium text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all"
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {children}
        {showExport && onExportClick ? (
          <Button
            type="button"
            variant="outline"
            onClick={onExportClick}
            disabled={exportDisabled || exportLoading}
            title="Exportar dados conforme filtros aplicados"
            className="h-10 gap-2 px-4 text-sm"
          >
            {exportLoading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {exportLabel}
          </Button>
        ) : null}
        <Button type="button" variant="outline" onClick={onFilterClick} className="h-10 gap-2 px-4 text-sm">
          <Filter size={14} className="text-zinc-500 dark:text-zinc-600" />
          {filterLabel}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10 w-10 shrink-0 p-0 text-zinc-500 dark:text-zinc-500"
              aria-label="Ordenar listagem"
            >
              <ArrowUpDown size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ordenar colunas</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
