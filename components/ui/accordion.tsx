"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASAccordionStyle = "outline" | "rounded";
export type CASAccordionSize = "sm" | "md" | "lg";

const headerVariants = cva(
  "cas-accordion-header flex w-full cursor-pointer items-center border-[color-mix(in_srgb,var(--action-secondary-base)_16%,transparent)] bg-[var(--surface-canvas)] text-left shadow-[0_1px_1px_rgba(25,25,28,0.04)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,var(--surface-canvas))]",
  {
    variants: {
      accordionStyle: {
        outline: "border-b-[1.5px] px-3",
        rounded: "rounded-md border-[1.5px] px-4",
      },
      size: {
        sm: "gap-2.5 py-3",
        md: "gap-3 py-4",
        lg: "gap-3 py-4",
      },
    },
    defaultVariants: { accordionStyle: "outline", size: "md" },
  }
);

const sizeSpecs: Record<CASAccordionSize, { icon: string; title: string; subtext: string }> = {
  sm: { icon: "size-4", title: "text-[16px] leading-[18px]", subtext: "text-[14px] leading-[16px]" },
  md: { icon: "size-5", title: "text-[18px] leading-[20px]", subtext: "text-[16px] leading-[18px]" },
  lg: { icon: "size-6", title: "text-[20px] leading-[28px]", subtext: "text-[18px] leading-[20px]" },
};

export interface AccordionItemProps {
  title: string;
  subtext?: string;
  icon?: IconDefinition;
  accordionStyle?: CASAccordionStyle;
  size?: CASAccordionSize;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function AccordionItem({ title, subtext, icon, accordionStyle = "outline", size = "md", defaultOpen = false, open, onOpenChange, className }: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const toggle = () => (onOpenChange ? onOpenChange(!isOpen) : setInternalOpen(o => !o));
  const spec = sizeSpecs[size];

  return (
    <div className={cn("cas-accordion-item", className)}>
      <button type="button" aria-expanded={isOpen} onClick={toggle} className={cn(headerVariants({ accordionStyle, size }), isOpen && "bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,var(--surface-canvas))]")}>
        {icon && <FontAwesomeIcon icon={icon} className={cn(spec.icon, "shrink-0 text-[var(--action-secondary-base)]")} />}
        <span className="min-w-0 flex-1">
          <span className={cn("block font-body font-black text-[var(--text-strong)]", spec.title)}>{title}</span>
          {isOpen && subtext && <span className={cn("mt-1 block font-body text-[var(--text-subtle)]", spec.subtext)}>{subtext}</span>}
        </span>
        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className={cn(spec.icon, "shrink-0 text-[var(--action-secondary-base)]")} />
      </button>
    </div>
  );
}
