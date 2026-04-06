import type { FC, ReactNode } from "react";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="w-full py-16 px-6 bg-white dark:bg-[#18181b] border border-dashed border-zinc-200 dark:border-[#27272a] rounded-2xl flex flex-col items-center justify-center text-center transition-colors duration-300">
      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 dark:border-[#27272a]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tighter text-zinc-800 dark:text-[#e7e5e4] mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-md leading-relaxed mb-6 text-balance">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-zinc-50 dark:bg-[#09090b] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-[#27272a] rounded-lg text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-primary hover:border-primary/30 transition-all"
        >
          <Plus size={15} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
