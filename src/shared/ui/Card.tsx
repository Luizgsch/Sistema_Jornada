import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  urgency?: "critical" | "warning" | "normal";
}

export function Card({ children, className, urgency }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors duration-300",
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

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn("text-base font-semibold leading-snug tracking-tight text-zinc-800 dark:text-[#e7e5e4]", className)}>
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
