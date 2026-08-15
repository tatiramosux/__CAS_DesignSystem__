import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/ui/pill";

export type CASCardVariant = "media-title" | "title-only" | "title-pills" | "title-input";
export type CASCardOrientation = "vertical" | "horizontal";
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
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
    },
    defaultVariants: { state: "default", orientation: "vertical" },
  }
);

export interface CardProps {
  variant: CASCardVariant;
  orientation?: CASCardOrientation;
  state?: CASCardState;
  title: string;
  description?: string;
  imageSrc?: string;
  pills?: CardPillOption[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ variant, orientation = "vertical", state = "default", title, description, imageSrc, pills, placeholder = "Type here…", className, style }: CardProps) {
  const isMedia = variant === "media-title";
  return (
    <div className={cn(cardVariants({ state, orientation: isMedia ? orientation : "vertical" }), className)} style={style}>
      {isMedia && (
        <div className={cn("shrink-0 bg-[var(--surface-subtle)]", orientation === "vertical" ? "h-[140px] w-full" : "h-full w-[140px]")}>
          {imageSrc && <img src={imageSrc} alt="" className="size-full object-cover" />}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate font-body text-base font-black text-[var(--text-strong)]">{title}</span>
          {variant === "title-pills" && <FontAwesomeIcon icon={faChevronUp} className="size-4 shrink-0 text-[var(--text-muted)]" />}
        </div>
        {description && <p className="m-0 font-body text-sm text-[var(--text-default)]">{description}</p>}
        {variant === "title-pills" && pills && (
          <div className="flex flex-wrap gap-1.5">
            {pills.map(p => (
              <Pill key={p.label} icon={p.icon} selected={p.selected}>{p.label}</Pill>
            ))}
          </div>
        )}
        {variant === "title-input" && (
          <div className="rounded-md border border-[var(--stroke-muted)] bg-[var(--surface-canvas)] p-2.5 shadow-[0_1px_2px_rgba(25,25,28,0.04)]">
            <textarea readOnly placeholder={placeholder} rows={3} className="w-full resize-none bg-transparent font-body text-sm text-[var(--text-default)] outline-none placeholder:text-[var(--text-muted)]" />
            <div className="mt-1 text-right font-body text-[10px] text-[var(--text-muted)]">0/120</div>
          </div>
        )}
      </div>
    </div>
  );
}
