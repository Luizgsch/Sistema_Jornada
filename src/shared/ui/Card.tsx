import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { cardImportanceClass, cardTitleImportanceClass, type UiImportance } from "@/shared/ui/uiImportance";

interface CardProps {
  children: ReactNode;
  className?: string;
  urgency?: "critical" | "warning" | "normal";
  /** `low`: superfície neutra e sombra mínima (engajamento / secundário). */
  importance?: UiImportance;
}

export function Card({ children, className, urgency, importance = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-radius-l border overflow-hidden transition-colors duration-300",
        importance === "default" &&
          "bg-white dark:bg-[#1e293b] border-zinc-100 dark:border-[#334155] shadow-sm dark:shadow-none",
        importance === "low" && cardImportanceClass("low"),
        urgency === "critical" && "border-l-4 border-l-red-600/80",
        urgency === "warning" && "border-l-4 border-l-amber-500/70",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("flex flex-col space-y-2 p-5 sm:p-6", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
  importance = "default",
}: CardProps & { importance?: UiImportance }) {
  return (
    <h3
      className={cn(
        importance === "default" &&
          "text-base font-semibold leading-snug tracking-tight text-zinc-800 dark:text-[#f8fafc]",
        importance === "low" && cardTitleImportanceClass("low"),
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={cn("flex items-center p-5 pt-0 sm:p-6 sm:pt-0", className)}>{children}</div>;
}
