"use client";

import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";

export interface SidebarHeaderProps {
  title: string;
  description?: string;
  onCollapse?: () => void;
  className?: string;
}

export function SidebarHeader({ title, description, onCollapse, className }: SidebarHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 border-b border-[color-mix(in_srgb,var(--action-primary-base)_16%,transparent)] px-[18px] py-3", className)}>
      <div className="flex h-8 items-center justify-between gap-2">
        <span className="min-w-0 flex-1 truncate font-body text-lg font-black text-[var(--action-primary-base)]">{title}</span>
        {onCollapse && (
          <button type="button" onClick={onCollapse} aria-label="Collapse sidebar" className="flex size-6 shrink-0 items-center justify-center rounded-md text-[var(--text-default)] hover:bg-black/5">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="size-3.5" />
          </button>
        )}
      </div>
      {description && <p className="m-0 font-body text-xs leading-[18px] text-[var(--text-subtle)]">{description}</p>}
    </div>
  );
}

export type CASSidebarItemSize = "sm" | "md" | "lg";
export type CASSidebarItemState = "default" | "hover" | "focused" | "active" | "disabled";

const sizeSpec: Record<CASSidebarItemSize, { text: string; icon: string }> = {
  sm: { text: "text-sm", icon: "size-4" },
  md: { text: "text-base", icon: "size-5" },
  lg: { text: "text-lg", icon: "size-6" },
};

export interface SidebarItemProps {
  text: string;
  icon?: IconDefinition;
  size?: CASSidebarItemSize;
  state?: CASSidebarItemState;
  showChevron?: boolean;
  /** Renders just the icon in a square button — used when the whole Sidebar is collapsed to icon-only. */
  collapsed?: boolean;
  /** Nested sub-items shown indented below, toggled open/closed via the trailing chevron. */
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function SidebarItem({ text, icon, size = "md", state = "default", showChevron = true, collapsed = false, children, defaultExpanded = false, className }: SidebarItemProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const spec = sizeSpec[size];
  const isDisabled = state === "disabled";
  const isActive = state === "active";
  const hasChildren = Boolean(children);

  if (collapsed) {
    return (
      <button
        type="button"
        aria-label={text}
        disabled={isDisabled}
        className={cn(
          "cas-sidebar-item relative flex size-9 shrink-0 items-center justify-center rounded transition-colors duration-150",
          state === "default" && "hover:bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,transparent)]",
          state === "hover" && "bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,transparent)]",
          state === "focused" && "bg-[var(--action-secondary-lighter)]",
          isActive && "bg-[var(--surface-canvas)]",
          isDisabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} className={cn(spec.icon, "text-[var(--text-strong)]")} />}
        {state === "focused" && <span className="pointer-events-none absolute inset-0 rounded border-2 border-[var(--stroke-muted)] opacity-50" />}
      </button>
    );
  }

  return (
    <div className={cn("cas-sidebar-item-group", className)}>
      <div
        className={cn(
          "relative flex w-full items-center gap-1 rounded py-1.5 pl-2 pr-2 transition-colors duration-150",
          state === "default" && "hover:bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,transparent)]",
          state === "hover" && "bg-[color-mix(in_srgb,var(--action-secondary-base)_8%,transparent)]",
          state === "focused" && "bg-[var(--action-secondary-lighter)]",
          isActive && "bg-[var(--surface-canvas)]",
          isDisabled && "cursor-not-allowed opacity-50",
          !isDisabled && "cursor-pointer"
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {icon && <FontAwesomeIcon icon={icon} className={cn(spec.icon, "shrink-0 text-[var(--text-strong)]")} />}
          <span className={cn("min-w-0 flex-1 truncate font-body text-[var(--text-strong)]", spec.text, isActive ? "font-bold" : "font-normal")}>{text}</span>
        </span>
        {showChevron && (
          <button
            type="button"
            aria-label={hasChildren ? (expanded ? "Collapse sub-items" : "Expand sub-items") : undefined}
            aria-expanded={hasChildren ? expanded : undefined}
            disabled={isDisabled || !hasChildren}
            onClick={() => setExpanded(o => !o)}
            className={cn("flex shrink-0 items-center justify-center", spec.icon, hasChildren ? "cursor-pointer" : "cursor-default")}
          >
            <FontAwesomeIcon icon={faChevronRight} className={cn("size-full text-[var(--text-strong)] transition-transform duration-150", hasChildren && expanded && "rotate-90")} />
          </button>
        )}
        {state === "focused" && <span className="pointer-events-none absolute inset-0 rounded border-2 border-[var(--stroke-muted)] opacity-50" />}
      </div>
      {hasChildren && expanded && <div className="mt-1 flex flex-col gap-1 border-l border-[var(--stroke-subtle)] pl-3">{children}</div>}
    </div>
  );
}
