import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export type CASTextInputSize = "medium" | "large";
export type CASTextInputState = "default" | "hover" | "focus" | "filled" | "error" | "disabled";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  size?: CASTextInputSize;
  state?: CASTextInputState;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  showInfo?: boolean;
  hintText?: string;
}

export function TextInput({
  label = "Input",
  required = true,
  size = "medium",
  state = "default",
  leadingIcon = false,
  trailingIcon = false,
  showInfo = false,
  hintText,
  disabled,
  className,
  id,
  ...props
}: TextInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const isDisabled = disabled || state === "disabled";
  const isError = state === "error";
  const forcedHover = state === "hover";
  const forcedFocus = state === "focus";

  return (
    <div className={cn("cas-text-input flex w-full flex-col gap-1.5 font-body", className)}>
      {label && (
        <div className="flex items-center gap-1.5">
          <label htmlFor={inputId} className={cn("flex items-center gap-1 text-sm font-bold text-[var(--text-strong)]", isDisabled && "text-[var(--text-subtle)]", isError && "text-[var(--feedback-error-base)]")}>
            {label}
            {required && !isDisabled && <span className="font-normal text-[var(--feedback-error-base)]">*</span>}
          </label>
          {showInfo && <FontAwesomeIcon icon={faCircleInfo} className="size-3.5 text-[var(--text-muted)]" />}
        </div>
      )}
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border-[1.5px] border-[var(--stroke-muted)] bg-[var(--surface-canvas)] px-3 shadow-[0_1px_2px_rgba(25,25,28,0.04)] transition-colors duration-150",
          "focus-within:border-[var(--action-secondary-base)] focus-within:shadow-[0_0_0_4px_color-mix(in_srgb,var(--action-secondary-base)_24%,transparent),0_1px_2px_rgba(25,25,28,0.04)]",
          size === "large" ? "h-14 px-4" : "h-12",
          forcedHover && "border-[var(--action-secondary-light)] cursor-pointer",
          forcedFocus && "border-[var(--action-secondary-base)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--action-secondary-base)_24%,transparent),0_1px_2px_rgba(25,25,28,0.04)]",
          isError && "border-[var(--feedback-error-base)] bg-[color-mix(in_srgb,var(--feedback-error-base)_8%,var(--surface-canvas))]",
          isDisabled && "cursor-not-allowed bg-[color-mix(in_srgb,var(--text-muted)_8%,var(--surface-canvas))]"
        )}
      >
        {leadingIcon && <FontAwesomeIcon icon={faLock} className={cn("size-5 shrink-0 text-[var(--text-muted)]", isError && "text-[var(--feedback-error-base)]", isDisabled && "text-[var(--text-disabled)]")} />}
        <input
          id={inputId}
          placeholder="Placeholder"
          disabled={isDisabled}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent font-inherit text-sm text-[var(--text-strong)] outline-none placeholder:text-[var(--text-disabled)] focus-visible:outline-none",
            size === "large" && "text-base",
            isError && "text-[var(--feedback-error-base)] placeholder:text-[var(--feedback-error-base)]",
            isDisabled && "text-[var(--text-disabled)] placeholder:text-[var(--text-disabled)]"
          )}
          {...props}
        />
        {trailingIcon && <FontAwesomeIcon icon={faEye} className={cn("size-5 shrink-0 text-[var(--text-muted)]", isError && "text-[var(--feedback-error-base)]", isDisabled && "text-[var(--text-disabled)]")} />}
      </div>
      {hintText && <p className={cn("m-0 text-xs text-[var(--text-muted)]", isError && "text-[var(--feedback-error-base)]")}>{hintText}</p>}
    </div>
  );
}
