import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export type CASBadgeSize = "medium" | "small";
export type CASBadgeStyle = "strong" | "fill" | "border";
export type CASBadgeColor = "primary" | "secondary" | "danger" | "success" | "warning" | "information" | "neutral" | "inverse";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: CASBadgeSize;
  badgeStyle?: CASBadgeStyle;
  color?: CASBadgeColor;
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
    <span className={cn("cas-badge", `cas-badge--${size}`, `cas-badge--${badgeStyle}`, `cas-badge--${color}`, className)} {...props}>
      {leadingIcon && <FontAwesomeIcon icon={faChevronLeft} />}
      <span>{children}</span>
      {trailingIcon && <FontAwesomeIcon icon={faChevronRight} />}
    </span>
  );
}
