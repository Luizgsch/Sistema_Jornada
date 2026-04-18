import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export type MiniListItem = {
  id: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

type MiniListWidgetProps = {
  label: string;
  items: MiniListItem[];
  maxItems?: number;
  delay?: number;
  className?: string;
};

export function MiniListWidget({
  label,
  items,
  maxItems = 3,
  delay = 0,
  className,
}: MiniListWidgetProps) {
  const slice = items.slice(0, maxItems);

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
        "flex flex-col min-h-0",
        className
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0">
        {label}
      </p>
      <ul className="mt-3 space-y-1 flex-1">
        {slice.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              disabled={!item.onClick}
              onClick={item.onClick}
              className={cn(
                "group flex w-full items-center gap-2 rounded-radius-m border border-transparent px-2 py-2 text-left transition-colors",
                item.onClick &&
                  "hover:border-zinc-200 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/40",
                !item.onClick && "cursor-default"
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-zinc-800 dark:text-[#e7e5e4]">
                  {item.title}
                </p>
                <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-500">{item.subtitle}</p>
              </div>
              {item.onClick && (
                <ChevronRight
                  size={14}
                  className="shrink-0 text-zinc-300 opacity-0 transition group-hover:opacity-100 group-hover:text-teal-600 dark:group-hover:text-teal-400"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
