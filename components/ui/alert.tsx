import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleCheck, faTriangleExclamation, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASAlertColor = "primary" | "secondary" | "error" | "success" | "warning" | "information" | "neutral";
export type CASAlertLayout = "vertical" | "horizontal";

const alertVariants = cva(
  "cas-alert flex border bg-[var(--alert-bg)] border-[var(--alert-border)] rounded-lg p-4 font-body shadow-[0_1px_2px_rgba(25,25,28,0.04)]",
  {
    variants: {
      color: {
        primary: "[--alert-bg:var(--action-primary-lighter)] [--alert-border:var(--action-primary-light)] [--alert-icon:var(--action-primary-base)]",
        secondary: "[--alert-bg:var(--action-secondary-lighter)] [--alert-border:var(--action-secondary-light)] [--alert-icon:var(--action-secondary-base)]",
        error: "[--alert-bg:var(--feedback-error-lighter)] [--alert-border:var(--feedback-error-light)] [--alert-icon:var(--feedback-error-base)]",
        success: "[--alert-bg:var(--feedback-success-lighter)] [--alert-border:var(--feedback-success-light)] [--alert-icon:var(--feedback-success-base)]",
        warning: "[--alert-bg:var(--feedback-warning-lighter)] [--alert-border:var(--feedback-warning-light)] [--alert-icon:var(--feedback-warning-base)]",
        information: "[--alert-bg:var(--feedback-info-lighter)] [--alert-border:var(--feedback-info-light)] [--alert-icon:var(--feedback-info-base)]",
        neutral: "[--alert-bg:var(--action-neutral-lighter)] [--alert-border:var(--action-neutral-light)] [--alert-icon:var(--text-muted)]",
      },
      layout: {
        vertical: "flex-col items-start gap-3",
        horizontal: "flex-row items-center gap-3",
      },
    },
    defaultVariants: { color: "primary", layout: "vertical" },
  }
);

const defaultIcon: Record<CASAlertColor, IconDefinition> = {
  primary: faCircleInfo,
  secondary: faCircleInfo,
  error: faCircleExclamation,
  success: faCircleCheck,
  warning: faTriangleExclamation,
  information: faCircleInfo,
  neutral: faCircleInfo,
};

export interface AlertProps extends Omit<VariantProps<typeof alertVariants>, "color"> {
  color?: CASAlertColor;
  layout?: CASAlertLayout;
  icon?: IconDefinition;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({ color = "primary", layout = "vertical", icon, title, description, actionLabel, onAction, dismissible, onDismiss, className }: AlertProps) {
  const isHorizontal = layout === "horizontal";
  return (
    <div className={cn(alertVariants({ color, layout }), className)}>
      <FontAwesomeIcon icon={icon ?? defaultIcon[color]} className="size-6 shrink-0 text-[var(--alert-icon)]" />
      <div className={cn("flex min-w-0 flex-1", isHorizontal ? "items-center justify-between gap-3" : "flex-col gap-2")}>
        <div className={cn(isHorizontal ? "flex items-center gap-3" : "flex flex-col gap-1")}>
          <span className="font-body text-xs font-bold text-[var(--text-strong)]">{title}</span>
          {!isHorizontal && description && <span className="font-body text-[10px] text-[var(--text-default)] opacity-80">{description}</span>}
          {isHorizontal && actionLabel && (
            <button type="button" onClick={onAction} className="font-body text-sm font-extrabold text-[var(--text-strong)]">{actionLabel}</button>
          )}
        </div>
        {!isHorizontal && actionLabel && (
          <button type="button" onClick={onAction} className="font-body text-sm font-extrabold text-[var(--text-strong)]">{actionLabel}</button>
        )}
      </div>
      {dismissible && (
        <>
          {isHorizontal && <div className="h-5 w-px shrink-0 bg-[var(--alert-border)]" aria-hidden="true" />}
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className="flex size-6 shrink-0 items-center justify-center rounded-md text-[var(--text-muted)] shadow-[0_1px_1px_rgba(25,25,28,0.04)] hover:bg-black/5">
            <FontAwesomeIcon icon={faXmark} className="size-3" />
          </button>
        </>
      )}
    </div>
  );
}
