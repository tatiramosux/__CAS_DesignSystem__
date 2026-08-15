"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASAccordionStyle = "outline" | "rounded";

const headerVariants = cva(
  "cas-accordion-header flex w-full cursor-pointer items-center gap-3 border-[color-mix(in_srgb,var(--action-secondary-base)_16%,transparent)] bg-[var(--surface-canvas)] py-5 text-left shadow-[0_1px_1px_rgba(25,25,28,0.04)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,var(--surface-canvas))]",
  {
    variants: {
      accordionStyle: {
        outline: "border-b-[1.5px] px-3",
        rounded: "rounded-md border-[1.5px] px-4",
      },
    },
    defaultVariants: { accordionStyle: "outline" },
  }
);

export interface AccordionItemProps {
  title: string;
  subtext?: string;
  icon?: IconDefinition;
  accordionStyle?: CASAccordionStyle;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function AccordionItem({ title, subtext, icon, accordionStyle = "outline", defaultOpen = false, open, onOpenChange, className }: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const toggle = () => (onOpenChange ? onOpenChange(!isOpen) : setInternalOpen(o => !o));

  return (
    <div className={cn("cas-accordion-item", className)}>
      <button type="button" aria-expanded={isOpen} onClick={toggle} className={cn(headerVariants({ accordionStyle }), isOpen && "bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,var(--surface-canvas))]")}>
        {icon && <FontAwesomeIcon icon={icon} className="size-6 shrink-0 text-[var(--action-secondary-base)]" />}
        <span className="min-w-0 flex-1">
          <span className="block font-body text-base font-black text-[var(--text-strong)]">{title}</span>
          {isOpen && subtext && <span className="mt-1 block font-body text-sm text-[var(--text-subtle)]">{subtext}</span>}
        </span>
        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className="size-4 shrink-0 text-[var(--action-secondary-base)]" />
      </button>
    </div>
  );
}
