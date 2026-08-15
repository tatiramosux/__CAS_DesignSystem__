import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export type CASLabelType = "default" | "error" | "disabled";

export interface LabelProps {
  children: string;
  optional?: boolean;
  required?: boolean;
  information?: boolean;
  type?: CASLabelType;
  className?: string;
}

const labelTextColor: Record<CASLabelType, string> = {
  default: "text-[var(--text-strong)]",
  error: "text-[var(--feedback-error-base)]",
  disabled: "text-[var(--text-subtle)]",
};

export function Label({ children, optional = false, required = false, information = false, type = "default", className }: LabelProps) {
  const isError = type === "error";
  return (
    <span className={cn("cas-label inline-flex items-center gap-1 font-body text-base", className)}>
      <span className={labelTextColor[type]}>{children}</span>
      {optional && <span className={isError ? "text-[var(--feedback-error-base)]" : "text-[var(--text-subtle)]"}>(optional)</span>}
      {required && <span className="text-[var(--feedback-error-base)]">*</span>}
      {information && <FontAwesomeIcon icon={faCircleInfo} className={cn("size-5", isError ? "text-[var(--feedback-error-base)]" : "text-[var(--text-muted)]")} />}
    </span>
  );
}

export type CASHintTextType = "default" | "error";

export interface HintTextProps {
  children: string;
  information?: boolean;
  type?: CASHintTextType;
  className?: string;
}

export function HintText({ children, information = false, type = "default", className }: HintTextProps) {
  const isError = type === "error";
  return (
    <span className={cn("cas-hint-text inline-flex items-center gap-2 font-body text-sm", isError ? "text-[var(--feedback-error-base)]" : "text-[var(--text-subtle)]", className)}>
      {information && <FontAwesomeIcon icon={faCircleInfo} className="size-5" />}
      {children}
    </span>
  );
}
