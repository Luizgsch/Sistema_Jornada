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
  children 
}) => {
  return (
    <div className="flex flex-col md:flex-row xl:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="text-[14px] md:text-[16px] text-slate-500 mt-1 max-w-2xl leading-relaxed text-balance">
          {description}
        </p>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        {children}
        {actionLabel && (
          <button 
            onClick={onAction}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-[14px] font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
          >
            {actionIcon}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
