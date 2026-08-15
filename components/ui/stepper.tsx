import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export type CASStepStatus = "done" | "active" | "inactive";
export type CASStepperVariant = "dot" | "number";

export interface StepperStep {
  label: string;
  status: CASStepStatus;
}

export interface StepperProps {
  steps: StepperStep[];
  variant?: CASStepperVariant;
  className?: string;
}

const circleClass: Record<CASStepStatus, string> = {
  done: "border-[var(--action-secondary-base)] bg-[var(--action-secondary-base)] text-[#001939]",
  active: "border-[var(--action-secondary-base)] bg-[var(--surface-canvas)] text-[var(--action-secondary-base)]",
  inactive: "cursor-pointer border-[var(--stroke-muted)] bg-[var(--surface-canvas)] text-[var(--text-disabled)] hover:border-[var(--stroke-default)] hover:text-[var(--text-subtle)]",
};

const labelClass: Record<CASStepStatus, string> = {
  done: "text-[var(--action-secondary-base)]",
  active: "text-[var(--action-secondary-base)]",
  inactive: "text-[var(--text-muted)]",
};

const lineClass: Record<CASStepStatus, string> = {
  done: "bg-[var(--action-secondary-base)]",
  active: "bg-[var(--stroke-default)]",
  inactive: "bg-[var(--stroke-muted)]",
};

export type CASStepperPosition = "left" | "right" | "left-right" | "end";

export interface StepperElementProps {
  status: CASStepStatus;
  position?: CASStepperPosition;
  variant?: CASStepperVariant;
  number?: number;
  label?: string;
  className?: string;
}

function StepCircle({ status, variant, number }: { status: CASStepStatus; variant: CASStepperVariant; number?: number }) {
  return (
    <span className={cn("group flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-body text-base font-bold transition-colors duration-150", circleClass[status])}>
      {variant === "number" ? (
        number
      ) : variant === "dot" && status === "done" ? (
        <FontAwesomeIcon icon={faCheck} className="size-3.5 text-white" />
      ) : variant === "dot" && status === "active" ? (
        <span className="size-2.5 rounded-full bg-[var(--action-secondary-base)]" />
      ) : variant === "dot" && status === "inactive" ? (
        <span className="size-2.5 rounded-full bg-[var(--text-subtle)] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      ) : null}
    </span>
  );
}

/** A single circle with its own line segment(s) — the atomic building block Figma's "Element" property (Left, right, left-right, End) describes. */
export function StepperElement({ status, position = "left-right", variant = "number", number, label, className }: StepperElementProps) {
  const hasLineBefore = position === "right" || position === "left-right";
  const hasLineAfter = position === "left" || position === "left-right";
  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <div className="flex items-center">
        {hasLineBefore && <span className={cn("h-0.5 w-[70px]", lineClass[status])} />}
        <StepCircle status={status} variant={variant} number={number} />
        {hasLineAfter && <span className={cn("h-0.5 w-[70px]", lineClass[status])} />}
      </div>
      {label && <span className={cn("font-body text-sm font-bold whitespace-nowrap", labelClass[status])}>{label}</span>}
    </div>
  );
}

export function Stepper({ steps, variant = "number", className }: StepperProps) {
  return (
    <div className={cn("cas-stepper flex w-full items-start", className)}>
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        const prevStatus = index > 0 ? steps[index - 1].status : undefined;
        return (
          <div key={step.label} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex w-full items-center">
              <span className={cn("h-0.5 flex-1", isFirst ? "invisible" : lineClass[prevStatus!])} />
              <StepCircle status={step.status} variant={variant} number={index + 1} />
              <span className={cn("h-0.5 flex-1", isLast ? "invisible" : lineClass[step.status])} />
            </div>
            <span className={cn("font-body text-sm font-bold whitespace-nowrap", labelClass[step.status])}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
