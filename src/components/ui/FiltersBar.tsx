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
    <div className="w-full bg-white p-4 border border-slate-200 rounded-xl mb-6 shadow-sm shadow-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-10 h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-shadow"
        />
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {children}
        <button 
          onClick={onFilterClick}
          className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg text-[14px] font-semibold hover:bg-slate-50 transition-colors"
        >
          <Filter size={16} className="text-slate-400" />
          {filterLabel}
        </button>
        <button className="inline-flex items-center justify-center p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
           <ArrowUpDown size={18} />
        </button>
      </div>
    </div>
  );
};
