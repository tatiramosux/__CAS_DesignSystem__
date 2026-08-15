import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";

export type CASBreadcrumbDivider = "arrow" | "slash";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: IconDefinition;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  divider?: CASBreadcrumbDivider;
  className?: string;
}

export function Breadcrumbs({ items, divider = "arrow", className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("cas-breadcrumbs flex items-center gap-2 font-body text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const crumbClass = "flex items-center gap-2";
        return (
          <span key={item.label} className={crumbClass}>
            {index > 0 && (
              <span className="flex size-6 items-center justify-center text-[var(--text-muted)]" aria-hidden="true">
                {divider === "arrow" ? <FontAwesomeIcon icon={faChevronRight} className="size-3" /> : <span>/</span>}
              </span>
            )}
            {isLast ? (
              <span className={cn(crumbClass, "font-extrabold text-[var(--text-strong)]")}>
                {item.icon && <FontAwesomeIcon icon={item.icon} className="size-4" />}
                {item.label}
              </span>
            ) : item.href ? (
              <Link href={item.href} className={cn(crumbClass, "text-[var(--text-subtle)] hover:font-extrabold hover:text-[var(--text-default)] hover:underline")}>
                {item.icon && <FontAwesomeIcon icon={item.icon} className="size-4" />}
                {item.label}
              </Link>
            ) : (
              <button type="button" className={cn(crumbClass, "text-[var(--text-subtle)] hover:font-extrabold hover:text-[var(--text-default)] hover:underline")}>
                {item.icon && <FontAwesomeIcon icon={item.icon} className="size-4" />}
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
