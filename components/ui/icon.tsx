import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CASIconSize = "sm" | "md" | "lg";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "md" },
});

export interface IconProps
  extends Omit<FontAwesomeIconProps, "size" | keyof VariantProps<typeof iconVariants>> {
  size?: CASIconSize;
}

export function Icon({ size = "md", className, ...props }: IconProps) {
  return <FontAwesomeIcon className={cn(iconVariants({ size }), className)} {...props} />;
}
