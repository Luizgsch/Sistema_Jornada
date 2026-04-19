import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/90 dark:bg-zinc-700/55",
        className
      )}
      {...props}
    />
  );
}
