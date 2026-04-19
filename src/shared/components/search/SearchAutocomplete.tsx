import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Search, Loader2 } from "lucide-react";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { highlightMatch } from "@/shared/lib/highlightMatch";
import { cn } from "@/shared/lib/cn";

export interface SearchSuggestion<T = unknown> {
  id: string;
  title: string;
  subtitle?: string;
  /** Rótulo curto do campo que gerou o match (ex.: Nome, CPF). */
  matchLabel: string;
  data?: T;
}

interface SearchAutocompleteProps<T = unknown> {
  value: string;
  onChange: (next: string) => void;
  /** Disparado quando a consulta debounced muda (útil para filtrar listas em sync com o painel). */
  onDebouncedQueryChange?: (debouncedQuery: string) => void;
  placeholder?: string;
  /** Consulta debounced (300 ms) usada para buscar sugestões — mesma da prop `debounceMs`. */
  fetchSuggestions: (debouncedQuery: string) => Promise<SearchSuggestion<T>[]>;
  onSelect: (item: SearchSuggestion<T>) => void;
  maxSuggestions?: number;
  debounceMs?: number;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  /** Ícone à esquerda (padrão: lupa). */
  icon?: ReactNode;
  /** Renderização customizada de cada linha; se omitido, usa layout padrão com highlight. */
  renderSuggestion?: (
    item: SearchSuggestion<T>,
    debouncedQuery: string,
    active: boolean
  ) => ReactNode;
  id?: string;
  "aria-label"?: string;
}

const PANEL =
  "absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(22rem,70vh)] overflow-y-auto rounded-lg border border-zinc-200 dark:border-[#334155] " +
  "bg-white/95 shadow-xl dark:bg-[#0f172a]/80 dark:backdrop-blur-md dark:shadow-black/40";

export function SearchAutocomplete<T = unknown>({
  value,
  onChange,
  onDebouncedQueryChange,
  placeholder = "Buscar…",
  fetchSuggestions,
  onSelect,
  maxSuggestions = 5,
  debounceMs = 300,
  className,
  inputClassName,
  disabled,
  icon,
  renderSuggestion,
  id: idProp,
  "aria-label": ariaLabel,
}: SearchAutocompleteProps<T>) {
  const autoId = useId();
  const listboxId = `${autoId}-listbox`;
  const inputId = idProp ?? `${autoId}-input`;

  const debouncedQuery = useDebouncedValue(value, debounceMs);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<SearchSuggestion<T>[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ignoreBlurRef = useRef(false);

  const debouncedCbRef = useRef(onDebouncedQueryChange);
  debouncedCbRef.current = onDebouncedQueryChange;
  useEffect(() => {
    debouncedCbRef.current?.(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      setItems([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const rows = await fetchSuggestions(q);
        if (cancelled) return;
        setItems(rows.slice(0, maxSuggestions));
        setActiveIndex(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, fetchSuggestions, maxSuggestions]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const showPanel = open && debouncedQuery.trim().length > 0 && (loading || items.length > 0);

  const pick = useCallback(
    (item: SearchSuggestion<T>) => {
      ignoreBlurRef.current = true;
      onSelect(item);
      setOpen(false);
      window.setTimeout(() => {
        ignoreBlurRef.current = false;
      }, 0);
    },
    [onSelect]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showPanel && e.key !== "Escape") return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!items.length) return;
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (showPanel && items[activeIndex]) {
        e.preventDefault();
        pick(items[activeIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-500">
          {icon ?? <Search className="h-4 w-4" aria-hidden />}
        </span>
        <input
          id={inputId}
          type="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel && items[activeIndex] ? `${inputId}-opt-${items[activeIndex].id}` : undefined}
          aria-label={ariaLabel}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            if (ignoreBlurRef.current) return;
            window.setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 h-10 rounded-radius-m border border-zinc-200 dark:border-[#334155] bg-zinc-50 dark:bg-[#0f172a] px-3 py-2 text-sm font-medium text-zinc-800 dark:text-[#f8fafc] placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all",
            inputClassName
          )}
        />
      </div>

      {showPanel ? (
        <div
          id={listboxId}
          role="listbox"
          className={PANEL}
          aria-busy={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-zinc-500 dark:text-zinc-400">
              <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
              Buscando…
            </div>
          ) : (
            items.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  id={`${inputId}-opt-${item.id}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(item)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-zinc-100 px-3 py-2.5 text-left last:border-b-0 dark:border-[#334155]/60",
                    active ? "bg-zinc-100 dark:bg-zinc-800/70" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  )}
                >
                  {renderSuggestion ? (
                    renderSuggestion(item, debouncedQuery, active)
                  ) : (
                    <DefaultSuggestionRow item={item} query={debouncedQuery} />
                  )}
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}

function DefaultSuggestionRow<T>({
  item,
  query,
}: {
  item: SearchSuggestion<T>;
  query: string;
}) {
  return (
    <>
      <span className="mt-0.5 shrink-0 rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
        {item.matchLabel}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-zinc-800 dark:text-zinc-200">
          {highlightMatch(item.title, query)}
        </span>
        {item.subtitle ? (
          <span className="mt-0.5 block truncate text-xs text-zinc-500 dark:text-zinc-500">
            {highlightMatch(item.subtitle, query)}
          </span>
        ) : null}
      </span>
    </>
  );
}
