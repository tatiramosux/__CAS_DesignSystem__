import { cn } from "@/lib/utils";

export interface ContentCardProps {
  label: string;
  mediaSrc?: string;
  className?: string;
}

export function ContentCard({ label, mediaSrc, className }: ContentCardProps) {
  return (
    <div className={cn("cas-content-card flex items-center gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--text-muted)_8%,transparent)] bg-[var(--surface-canvas)] p-4 shadow-[0_1px_1px_rgba(25,25,28,0.04)]", className)}>
      <span className="min-w-0 flex-1 truncate font-body text-lg font-bold text-[var(--text-strong)]">{label}</span>
      <div className="h-[38px] w-[69px] shrink-0 overflow-hidden rounded-lg bg-[var(--surface-subtle)]">
        {mediaSrc && <img src={mediaSrc} alt="" className="size-full object-cover" />}
      </div>
    </div>
  );
}
