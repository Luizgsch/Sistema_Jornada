import type { FC } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

interface FiltersBarProps {
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  onFilterClick?: () => void;
  filterLabel?: string;
  children?: React.ReactNode;
}

export const FiltersBar: FC<FiltersBarProps> = ({
  searchPlaceholder = "Buscar...",
  onSearch,
  onFilterClick,
  filterLabel = "Filtros",
  children
}) => {
  return (
    <div className="w-full bg-white dark:bg-[#18181b] p-4 border border-zinc-200 dark:border-[#27272a] rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 h-10 rounded-lg border border-zinc-200 dark:border-[#27272a] bg-zinc-50 dark:bg-[#09090b] px-3 py-2 text-sm font-medium text-zinc-800 dark:text-[#e7e5e4] placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all"
        />
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {children}
        <button
          onClick={onFilterClick}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272a] text-zinc-600 dark:text-zinc-400 rounded-lg text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
        >
          <Filter size={14} className="text-zinc-500 dark:text-zinc-600" />
          {filterLabel}
        </button>
        <button className="inline-flex items-center justify-center p-2.5 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-[#27272a] text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <ArrowUpDown size={16} />
        </button>
      </div>
    </div>
  );
};
