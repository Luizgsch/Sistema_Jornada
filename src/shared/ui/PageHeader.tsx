import type { FC, ReactNode } from "react";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
  children?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  actionLabel,
  actionIcon = <Plus size={18} />,
  onAction,
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row xl:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter text-zinc-800 dark:text-[#e7e5e4]">
          {title}
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl leading-relaxed text-balance">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {children}
        {actionLabel && (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {actionIcon}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
