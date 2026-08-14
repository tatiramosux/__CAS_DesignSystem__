import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASBadgeSize = "medium" | "small";
export type CASBadgeStyle = "strong" | "fill" | "border";
export type CASBadgeColor = "primary" | "secondary" | "danger" | "success" | "warning" | "information" | "neutral" | "inverse";

const badgeVariants = cva(
  "cas-badge inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-transparent font-body font-extrabold [&_svg]:size-5",
  {
    variants: {
      color: {
        primary: "[--badge-strong-bg:var(--action-primary-base)] [--badge-soft-bg:var(--action-primary-lighter)] [--badge-soft-border:var(--action-primary-light)] [--badge-text:var(--action-primary-base)]",
        secondary: "[--badge-strong-bg:var(--action-secondary-base)] [--badge-soft-bg:var(--action-secondary-lighter)] [--badge-soft-border:var(--action-secondary-light)] [--badge-text:var(--action-secondary-base)]",
        danger: "[--badge-strong-bg:var(--feedback-error-dark)] [--badge-soft-bg:var(--feedback-error-lighter)] [--badge-soft-border:var(--feedback-error-light)] [--badge-text:var(--feedback-error-dark)]",
        success: "[--badge-strong-bg:var(--feedback-success-dark)] [--badge-soft-bg:var(--feedback-success-lighter)] [--badge-soft-border:var(--feedback-success-light)] [--badge-text:var(--feedback-success-dark)]",
        warning: "[--badge-strong-bg:var(--feedback-warning-dark)] [--badge-soft-bg:var(--feedback-warning-lighter)] [--badge-soft-border:var(--feedback-warning-light)] [--badge-text:var(--feedback-warning-dark)]",
        information: "[--badge-strong-bg:var(--feedback-info-dark)] [--badge-soft-bg:var(--feedback-info-lighter)] [--badge-soft-border:var(--feedback-info-light)] [--badge-text:var(--feedback-info-dark)]",
        neutral: "[--badge-strong-bg:var(--text-strong)] [--badge-soft-bg:color-mix(in_srgb,var(--text-muted)_8%,transparent)] [--badge-soft-border:color-mix(in_srgb,var(--text-muted)_16%,transparent)] [--badge-text:var(--text-default)]",
        inverse: "[--badge-strong-bg:var(--surface-canvas)] [--badge-soft-bg:var(--surface-canvas)] [--badge-soft-border:color-mix(in_srgb,var(--text-muted)_16%,transparent)] [--badge-text:var(--text-default)]",
      },
      badgeStyle: {
        strong: "bg-[var(--badge-strong-bg)] text-white",
        fill: "bg-[var(--badge-soft-bg)] text-[var(--badge-text)]",
        border: "border-[var(--badge-soft-border)] bg-[var(--badge-soft-bg)] text-[var(--badge-text)]",
      },
      size: {
        medium: "px-1.5 py-1 text-sm leading-4",
        small: "px-1.5 py-0.5 text-xs leading-[1.5] [&_svg]:size-4",
      },
    },
    compoundVariants: [{ color: "inverse", badgeStyle: "strong", className: "border-[var(--badge-soft-border)]" }],
    defaultVariants: { color: "primary", badgeStyle: "fill", size: "medium" },
  }
);

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof badgeVariants> {
  leadingIcon?: boolean;
  trailingIcon?: boolean;
}

export function Badge({
  size = "medium",
  badgeStyle = "fill",
  color = "primary",
  leadingIcon = false,
  trailingIcon = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ color, badgeStyle, size }), className)} {...props}>
      {leadingIcon && <FontAwesomeIcon icon={faChevronLeft} />}
      <span>{children}</span>
      {trailingIcon && <FontAwesomeIcon icon={faChevronRight} />}
    </span>
  );
}
