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
  return (
    <div className={cn("cas-text-input", `cas-text-input--${size}`, `cas-text-input--${state}`, className)}>
      {label && (
        <div className="cas-text-input__label-row">
          <label htmlFor={inputId} className="cas-text-input__label">
            {label}
            {required && <span className="cas-text-input__required">*</span>}
          </label>
          {showInfo && <FontAwesomeIcon icon={faCircleInfo} className="cas-text-input__info" />}
        </div>
      )}
      <div className="cas-text-input__field">
        {leadingIcon && <FontAwesomeIcon icon={faLock} className="cas-text-input__icon" />}
        <input id={inputId} placeholder="Placeholder" disabled={isDisabled} className="cas-text-input__control" {...props} />
        {trailingIcon && <FontAwesomeIcon icon={faEye} className="cas-text-input__icon" />}
      </div>
      {hintText && <p className="cas-text-input__hint">{hintText}</p>}
    </div>
  );
}
