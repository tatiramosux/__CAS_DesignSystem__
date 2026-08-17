"use client";

import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faImage, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";

export type CASCardImagePosition = "top" | "bottom" | "left" | "none";
export type CASCardContent = "description" | "pills" | "input";
export type CASCardPillSize = "large" | "small";
export type CASCardState = "default" | "hover" | "select";

export interface CardPillOption {
  label: string;
  icon?: IconDefinition;
  selected?: boolean;
}

const cardVariants = cva(
  "cas-card relative flex overflow-hidden rounded-2xl border bg-[var(--surface-canvas)] shadow-[0_2px_2px_rgba(25,25,28,0.08),0_4px_4px_rgba(25,25,28,0.12)] transition-colors duration-150",
  {
    variants: {
      state: {
        default: "border-[color-mix(in_srgb,var(--text-muted)_8%,transparent)] hover:border-[color-mix(in_srgb,var(--action-secondary-base)_24%,transparent)]",
        hover: "border-[color-mix(in_srgb,var(--action-secondary-base)_24%,transparent)]",
        select: "border-[var(--action-secondary-base)] bg-[var(--action-secondary-lighter)]",
      },
      imagePosition: {
        top: "flex-col",
        bottom: "flex-col",
        left: "flex-row",
        none: "flex-col",
      },
    },
    defaultVariants: { state: "default", imagePosition: "none" },
  }
);

function PlaceholderImage({ className }: { className?: string }) {
  return (
    <div className={cn("flex shrink-0 grow-0 items-center justify-center bg-[var(--surface-subtle)]", className)}>
      <FontAwesomeIcon icon={faImage} className="size-6 text-[var(--text-strong)]" />
    </div>
  );
}

function CheckboxDot({ className }: { className?: string }) {
  return <span className={cn("size-5 shrink-0 rounded-full border-[1.25px] border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] bg-[var(--surface-canvas)] shadow-[0_1px_2px_rgba(25,25,28,0.04)]", className)} />;
}

function FooterSlot() {
  return (
    <div className="flex flex-1 items-center justify-center gap-2 rounded-md border border-dashed border-[var(--action-primary-base)] bg-[var(--action-primary-lighter)] px-2 py-2.5 text-[var(--action-primary-base)]">
      <FontAwesomeIcon icon={faPuzzlePiece} className="size-4" />
      <span className="font-body text-xs">Slot</span>
    </div>
  );
}

export interface CardProps {
  state?: CASCardState;
  image?: CASCardImagePosition;
  imageSrc?: string;
  checkbox?: boolean;
  title: string;
  chevron?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  content?: CASCardContent;
  description?: string;
  pills?: CardPillOption[];
  pillSize?: CASCardPillSize;
  textAreaPlaceholder?: string;
  footerSlots?: 0 | 1 | 2;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({
  state = "default",
  image = "none",
  imageSrc,
  checkbox = true,
  title,
  chevron = false,
  defaultExpanded = true,
  expanded: expandedProp,
  onExpandedChange,
  content = "description",
  description,
  pills,
  pillSize = "large",
  textAreaPlaceholder = "Placeholder",
  footerSlots = 0,
  className,
  style,
}: CardProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = !chevron || (expandedProp ?? internalExpanded);
  const toggleExpanded = () => (onExpandedChange ? onExpandedChange(!isExpanded) : setInternalExpanded(o => !o));
  const thumbnailSize = pillSize === "large" ? "size-[67px]" : "size-11";
  const inlineThumbnail = content !== "description" && (
    <div className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-[var(--stroke-muted)] bg-[var(--surface-subtle)]", thumbnailSize)}>
      {imageSrc ? <img src={imageSrc} alt="" className="size-full object-cover" /> : <FontAwesomeIcon icon={faImage} className="size-4 text-[var(--text-strong)]" />}
    </div>
  );

  const titleRow = (
    <div className="flex w-full items-center gap-3">
      {checkbox && <CheckboxDot />}
      {inlineThumbnail}
      <span className={cn("min-w-0 flex-1 font-body text-[var(--text-strong)]", content === "description" ? "text-lg font-bold text-[var(--text-strong)]" : "text-base font-black")}>{title}</span>
      {chevron && (
        <button
          type="button"
          aria-label={isExpanded ? "Collapse" : "Expand"}
          aria-expanded={isExpanded}
          onClick={toggleExpanded}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronUp} className={cn("size-6 text-[var(--text-strong)] transition-transform duration-150", !isExpanded && "rotate-180")} />
        </button>
      )}
    </div>
  );

  return (
    <div className={cn(cardVariants({ state, imagePosition: image }), className)} style={style}>
      {image === "top" && <PlaceholderImage className="h-[150px] w-full shrink-0" />}
      {image === "left" && <PlaceholderImage className="w-[140px] shrink-0" />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className={cn("flex flex-col gap-1 p-4", content === "input" && isExpanded && "border-b border-[color-mix(in_srgb,var(--text-muted)_24%,transparent)] py-3")}>
          <div className="flex flex-col gap-3.5">
            {titleRow}
            {content === "description" && isExpanded && <div className="h-px w-full bg-[var(--stroke-subtle)]" />}
            {content === "description" && isExpanded && description && <p className="m-0 font-body text-sm text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        {content === "pills" && isExpanded && pills && (
          <div className="flex flex-wrap gap-2 p-4 pt-0">
            {pills.map(p => (
              <Pill key={p.label} icon={p.icon} selected={p.selected}>{p.label}</Pill>
            ))}
          </div>
        )}
        {content === "input" && isExpanded && (
          <div className="p-4">
            <div className="rounded-md border-[1.5px] border-[var(--stroke-muted)] bg-[var(--surface-canvas)] p-3 shadow-[0_1px_2px_rgba(25,25,28,0.04)]">
              <textarea readOnly placeholder={textAreaPlaceholder} rows={3} className="w-full resize-none bg-transparent font-body text-sm text-[var(--text-subtle)] outline-none placeholder:text-[var(--text-subtle)]" />
              <div className="mt-1 text-right font-body text-xs text-[var(--text-subtle)]">0/120</div>
            </div>
          </div>
        )}
        {image === "bottom" && <PlaceholderImage className="h-[150px] w-full shrink-0" />}
        {footerSlots > 0 && (
          <div className="flex items-center justify-end gap-2 p-4">
            <FooterSlot />
            {footerSlots === 2 && <FooterSlot />}
          </div>
        )}
      </div>
    </div>
  );
}
