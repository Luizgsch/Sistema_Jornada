import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/shared/lib/cn";

function TooltipProvider({
  children,
  delayDuration = 300,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, side = "top", sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "z-[9999] max-w-xs rounded-md border px-2.5 py-1.5 text-xs font-medium leading-snug shadow-md",
        "border-zinc-600 bg-zinc-950 text-zinc-50",
        "dark:border-zinc-700 dark:bg-black dark:text-white",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
