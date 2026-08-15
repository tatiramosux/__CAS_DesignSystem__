import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva("cas-pill inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-body text-xs", {
  variants: {
    selected: {
      false: "border-[var(--action-neutral-light)] bg-[var(--action-neutral-lighter)] text-[var(--text-default)]",
      true: "border-[var(--action-secondary-base)] bg-[var(--action-secondary-lighter)] text-[var(--action-secondary-base)]",
    },
  },
  defaultVariants: { selected: false },
});

export interface PillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof pillVariants> {
  icon?: IconDefinition;
}

export function Pill({ selected = false, icon, className, children, ...props }: PillProps) {
  return (
    <span className={cn(pillVariants({ selected }), className)} {...props}>
      {icon && <FontAwesomeIcon icon={icon} className="size-4" />}
      {children}
    </span>
  );
}
