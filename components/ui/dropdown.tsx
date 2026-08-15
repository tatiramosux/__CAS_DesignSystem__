"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASDropdownSize = "sm" | "compact" | "medium" | "large";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: IconDefinition;
  disabled?: boolean;
}

const triggerVariants = cva(
  "cas-dropdown-trigger flex w-full items-center justify-between gap-2 rounded-xl border-[1.5px] border-[var(--stroke-muted)] bg-[var(--surface-canvas)] px-3 text-left font-body font-bold text-[var(--text-strong)] shadow-[0_1px_2px_rgba(25,25,28,0.04)] transition-colors duration-150 outline-none",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        compact: "h-10 text-sm",
        medium: "h-12 text-sm",
        large: "h-14 px-4 text-base",
      },
    },
    defaultVariants: { size: "medium" },
  }
);

export interface DropdownProps extends Omit<VariantProps<typeof triggerVariants>, "size"> {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  hintText?: string;
  size?: CASDropdownSize;
  disabled?: boolean;
  error?: boolean;
  position?: "left" | "right";
  /** Renders the trigger for placement on a dark/colored surface (e.g. the topbar) instead of a light card. */
  inverse?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  label,
  hintText,
  size = "medium",
  disabled = false,
  error = false,
  position = "left",
  inverse = false,
  className,
  "aria-label": ariaLabel,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex(o => o.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex(i => Math.min(options.length - 1, i + 1)); }
      if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex(i => Math.max(0, i - 1)); }
      if (event.key === "Enter" || event.key === " ") {
        const option = options[activeIndex];
        if (option && !option.disabled) { event.preventDefault(); onChange(option.value); setOpen(false); }
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("mousedown", onPointerDown); document.removeEventListener("keydown", onKeyDown); };
  }, [open, options, activeIndex, onChange]);

  return (
    <div className={cn("cas-dropdown relative", disabled && "cursor-not-allowed")} ref={rootRef}>
      {label && <label className="mb-1.5 flex items-center gap-1 text-sm font-bold text-[var(--text-strong)]">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? label}
        onClick={() => !disabled && setOpen(o => !o)}
        className={cn(
          triggerVariants({ size }),
          !disabled && "hover:border-[var(--action-secondary-light)]",
          open && "border-[var(--action-secondary-base)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--action-secondary-base)_24%,transparent),0_1px_2px_rgba(25,25,28,0.04)]",
          error && "border-[var(--feedback-error-base)] bg-[color-mix(in_srgb,var(--feedback-error-base)_8%,var(--surface-canvas))] text-[var(--feedback-error-base)]",
          disabled && "cursor-not-allowed bg-[color-mix(in_srgb,var(--text-muted)_8%,var(--surface-canvas))] text-[var(--text-disabled)]",
          inverse && !error && !disabled && "border-white/30 bg-white/10 text-white shadow-none hover:border-white/60",
          inverse && open && !error && "border-white/70 shadow-none",
          className
        )}
      >
        <span className="flex min-w-0 items-center gap-2 truncate">
          {selected?.icon && <FontAwesomeIcon icon={selected.icon} className="size-4 shrink-0" />}
          <span className="truncate">{selected?.label ?? "Select…"}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className={cn("size-3 shrink-0 transition-transform duration-150", inverse ? "text-white/70" : "text-[var(--text-muted)]", open && "rotate-180")} />
      </button>
      {hintText && <p className={cn("m-0 mt-1.5 text-xs text-[var(--text-muted)]", error && "text-[var(--feedback-error-base)]")}>{hintText}</p>}
      {open && (
        <div
          role="listbox"
          id={listId}
          className={cn("cas-dropdown-panel absolute top-full z-30 mt-1.5 min-w-full overflow-hidden rounded-xl border-[1.5px] border-[var(--stroke-subtle)] bg-[var(--surface-canvas)] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.14)]", position === "right" ? "right-0" : "left-0")}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => { if (!option.disabled) { onChange(option.value); setOpen(false); } }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left font-body text-sm text-[var(--text-strong)] transition-colors duration-100",
                  isSelected && "font-bold bg-[var(--action-secondary-lighter)]",
                  isActive && !option.disabled && "bg-[var(--action-secondary-lighter)] outline outline-1 outline-[var(--action-secondary-base)]",
                  option.disabled && "cursor-not-allowed text-[var(--text-disabled)]"
                )}
              >
                {option.icon && <FontAwesomeIcon icon={option.icon} className="size-4 shrink-0" />}
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                {isSelected && <FontAwesomeIcon icon={faCheck} className="size-3.5 shrink-0 text-[var(--action-secondary-base)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
