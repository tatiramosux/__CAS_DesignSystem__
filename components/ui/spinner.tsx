import * as React from "react";
import { cn } from "@/lib/utils";

export type CASSpinnerStyle = "round" | "dots";

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  spinnerStyle?: CASSpinnerStyle;
  label?: string;
}

const DOTS = Array.from({ length: 8 }, (_, i) => i);

export function Spinner({ spinnerStyle = "round", label = "Loading", className, ...props }: SpinnerProps) {
  if (spinnerStyle === "dots") {
    return (
      <div role="status" aria-label={label} className={cn("cas-spinner-dots", className)} {...props}>
        {DOTS.map(i => (
          <span key={i} className="cas-spinner-dot" style={{ transform: `rotate(${i * 45}deg)`, animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    );
  }
  return <div role="status" aria-label={label} className={cn("cas-spinner-round", className)} {...props} />;
}
