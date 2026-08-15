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
  inactive: "border-[var(--stroke-muted)] bg-[var(--surface-canvas)] text-[var(--text-disabled)]",
};

const labelClass: Record<CASStepStatus, string> = {
  done: "text-[var(--action-secondary-base)]",
  active: "text-[var(--action-secondary-base)]",
  inactive: "text-[var(--text-muted)]",
};

const lineClass: Record<CASStepStatus, string> = {
  done: "bg-[var(--action-secondary-base)]",
  active: "bg-[var(--stroke-muted)]",
  inactive: "bg-[var(--stroke-subtle)]",
};

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
              <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-body text-base font-bold", circleClass[step.status])}>
                {variant === "number" ? index + 1 : null}
              </span>
              <span className={cn("h-0.5 flex-1", isLast ? "invisible" : lineClass[step.status])} />
            </div>
            <span className={cn("font-body text-sm font-bold whitespace-nowrap", labelClass[step.status])}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
