import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASAvatarSize = 16 | 20 | 24 | 28 | 32 | 40 | 48;
export type CASAvatarVariant = "image" | "text" | "placeholder";

const avatarVariants = cva("cas-avatar inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full", {
  variants: {
    variant: {
      image: "bg-[var(--surface-subtle)]",
      text: "bg-[var(--action-secondary-light)] font-body font-black text-[var(--action-secondary-darker)]",
      placeholder: "bg-[var(--action-secondary-light)] text-[var(--action-secondary-darker)]",
    },
  },
  defaultVariants: { variant: "image" },
});

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  variant?: CASAvatarVariant;
  size?: CASAvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
}

export function Avatar({ variant = "image", size = 40, src, alt = "", initials = "", className, style, ...props }: AvatarProps) {
  const fontSize = Math.max(10, Math.round(size * 0.34));
  return (
    <span
      className={cn(avatarVariants({ variant }), className)}
      style={{ width: size, height: size, fontSize: variant === "text" ? fontSize : undefined, ...style }}
      {...props}
    >
      {variant === "image" && (src ? <img src={src} alt={alt} className="size-full object-cover" /> : null)}
      {variant === "text" && <span>{initials}</span>}
      {variant === "placeholder" && <FontAwesomeIcon icon={faUser} style={{ width: size * 0.5, height: size * 0.5 }} />}
    </span>
  );
}
