import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          // Variants
          variant === "default" &&
            "bg-white text-slate-900 shadow hover:bg-slate-100 active:scale-[0.99]",
          variant === "secondary" &&
            "bg-slate-800 text-slate-100 hover:bg-slate-700",
          variant === "outline" &&
            "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white",
          variant === "ghost" &&
            "text-slate-300 hover:bg-slate-800 hover:text-white",
          variant === "destructive" &&
            "bg-red-600 text-white hover:bg-red-700 shadow-sm",
          // Sizes
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-11 rounded-lg px-8 text-base",
          size === "icon" && "h-9 w-9",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

