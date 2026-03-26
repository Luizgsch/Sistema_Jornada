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
    <div className="w-full py-16 px-6 bg-white border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-100">
        {icon}
      </div>
      <h3 className="text-[18px] font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-[14px] text-slate-500 max-w-md leading-relaxed mb-6 text-balance">
        {description}
      </p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-white text-slate-700 border border-slate-200 shadow-sm rounded-lg text-[14px] font-bold hover:bg-slate-50 hover:text-primary hover:border-primary/30 transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
