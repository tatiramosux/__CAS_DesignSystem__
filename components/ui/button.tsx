import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASButtonType = "primary" | "secondary" | "tertiary" | "danger" | "neutral";
export type CASButtonSize = "large" | "medium" | "small";
export type CASButtonState = "default" | "hover" | "focus" | "loading" | "disabled";
export type CASButtonTreatment = "solid" | "outline";

const buttonVariants = cva(
  "cas-button relative inline-flex w-max min-w-[104px] items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border font-body text-sm font-bold leading-none transition-colors duration-150 border-[var(--button-base)] bg-[var(--button-base)] text-[var(--button-text-inverse)] hover:bg-[var(--button-hover)] hover:border-[var(--button-hover)] disabled:cursor-not-allowed disabled:bg-[var(--surface-subtle)] disabled:border-[var(--stroke-subtle)] disabled:text-[var(--button-text-disabled)]",
  {
    variants: {
      buttonType: {
        primary: "[--button-base:var(--action-primary-base)] [--button-hover:var(--action-primary-dark)] [--button-soft:var(--action-primary-lighter)]",
        secondary: "[--button-base:var(--action-secondary-base)] [--button-hover:var(--action-secondary-dark)] [--button-soft:var(--action-secondary-lighter)] text-[var(--text-strong)]",
        tertiary: "[--button-base:var(--action-tertiary-base)] [--button-hover:var(--action-tertiary-dark)] [--button-soft:var(--action-tertiary-lighter)] text-[var(--text-strong)]",
        neutral: "[--button-base:var(--action-neutral-base)] [--button-hover:var(--action-neutral-dark)] [--button-soft:var(--action-neutral-lighter)] text-[var(--text-strong)]",
        danger: "[--button-base:var(--feedback-error-base)] [--button-hover:var(--feedback-error-dark)] [--button-soft:var(--feedback-error-lighter)]",
      },
      size: {
        large: "h-14 px-7",
        medium: "h-12 px-6",
        small: "h-10 px-5 text-xs",
      },
      treatment: {
        solid: "",
        outline: "bg-transparent text-[var(--button-base)] hover:bg-[var(--button-soft)] hover:text-[var(--button-hover)] disabled:bg-transparent",
      },
    },
    defaultVariants: { buttonType: "primary", size: "medium", treatment: "solid" },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof VariantProps<typeof buttonVariants>> {
  asChild?: boolean;
  buttonType?: CASButtonType;
  size?: CASButtonSize;
  treatment?: CASButtonTreatment;
  state?: CASButtonState;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
}

export function Button({
  asChild = false,
  buttonType = "primary",
  size = "medium",
  state = "default",
  treatment = "solid",
  leadingIcon = false,
  trailingIcon = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  const isLoading = state === "loading";
  const isDisabled = disabled || state === "disabled" || isLoading;
  const resolvedTreatment: CASButtonTreatment = buttonType === "neutral"
    ? "outline"
    : buttonType === "secondary"
      ? treatment
      : "solid";
  const forcedHover = state === "hover" && !isDisabled;
  const forcedFocus = state === "focus" && !isDisabled;
  return (
    <Component
      className={cn(
        buttonVariants({ buttonType, size, treatment: resolvedTreatment }),
        forcedHover && (resolvedTreatment === "outline" ? "bg-[var(--button-soft)] text-[var(--button-hover)]" : "bg-[var(--button-hover)] border-[var(--button-hover)]"),
        forcedFocus && "shadow-[0_0_0_3px_var(--surface),0_0_0_5px_var(--button-base)]",
        resolvedTreatment === "outline" && isDisabled && "border-[var(--stroke-subtle)]",
        className
      )}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <FontAwesomeIcon className="absolute animate-spin" icon={faCircleNotch} />
      ) : leadingIcon ? (
        <FontAwesomeIcon className="size-3.5" icon={faChevronLeft} />
      ) : null}
      {asChild ? (
        <Slottable>{children}</Slottable>
      ) : (
        <span className={cn(isLoading && "invisible")}>{children}</span>
      )}
      {!isLoading && trailingIcon ? <FontAwesomeIcon className="size-3.5" icon={faChevronRight} /> : null}
    </Component>
  );
}
