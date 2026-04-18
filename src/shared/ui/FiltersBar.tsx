import type { FC } from "react";
import { Search, Filter, ArrowUpDown, Download, Loader2 } from "lucide-react";

interface FiltersBarProps {
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 h-10 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-zinc-50 dark:bg-[#0f172a] px-3 py-2 text-sm font-medium text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all"
        />
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {children}
        {showExport && onExportClick ? (
          <button
            type="button"
            onClick={onExportClick}
            disabled={exportDisabled || exportLoading}
            title="Exportar dados conforme filtros aplicados"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 border border-zinc-200 dark:border-[#334155] bg-transparent text-zinc-600 dark:text-zinc-400 rounded-radius-m text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {exportLoading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {exportLabel}
          </button>
        ) : null}
        <button
          onClick={onFilterClick}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-zinc-50 dark:bg-[#0f172a] border border-zinc-200 dark:border-[#334155] text-zinc-600 dark:text-zinc-400 rounded-radius-m text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
        >
          <Filter size={14} className="text-zinc-500 dark:text-zinc-600" />
          {filterLabel}
        </button>
        <button className="inline-flex items-center justify-center p-2.5 bg-zinc-50 dark:bg-[#0f172a] border border-zinc-200 dark:border-[#334155] text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 rounded-radius-m hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <ArrowUpDown size={16} />
        </button>
      </div>
    </div>
  );
};
