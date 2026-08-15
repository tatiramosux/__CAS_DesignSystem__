import * as React from "react";
import { cn } from "@/lib/utils";

export type CASDividerOrientation = "horizontal" | "vertical";
export type CASDividerStyle = "line" | "dotted";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: CASDividerOrientation;
  dividerStyle?: CASDividerStyle;
}

export function Divider({ orientation = "horizontal", dividerStyle = "line", className, style, ...props }: DividerProps) {
  const horizontal = orientation === "horizontal";
  const dotted = dividerStyle === "dotted";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn("cas-divider shrink-0 bg-[var(--stroke-subtle)]", horizontal ? "h-px w-full" : "h-full w-px self-stretch", className)}
      style={
        dotted
          ? {
              backgroundColor: "transparent",
              backgroundImage: "radial-gradient(circle, var(--stroke-subtle) 0.75px, transparent 0.75px)",
              backgroundSize: horizontal ? "6px 1.5px" : "1.5px 6px",
              backgroundRepeat: horizontal ? "repeat-x" : "repeat-y",
              ...style,
            }
          : style
      }
      {...props}
    />
  );
}
