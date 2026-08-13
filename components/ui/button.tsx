import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export type CASButtonType = "primary" | "secondary" | "tertiary" | "danger" | "neutral";
export type CASButtonSize = "large" | "medium" | "small";
export type CASButtonState = "default" | "hover" | "focus" | "loading" | "disabled";
export type CASButtonTreatment = "solid" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  buttonType?: CASButtonType;
  size?: CASButtonSize;
  state?: CASButtonState;
  treatment?: CASButtonTreatment;
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
  return (
    <Component
      className={cn("cas-button", `cas-button--${buttonType}`, `cas-button--${size}`, `cas-button--${state}`, `cas-button--${treatment}`, className)}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? <FontAwesomeIcon className="cas-button__spinner" icon={faCircleNotch} /> : leadingIcon ? <FontAwesomeIcon icon={faChevronLeft} /> : null}
      <span>{children}</span>
      {!isLoading && trailingIcon ? <FontAwesomeIcon icon={faChevronRight} /> : null}
    </Component>
  );
}
