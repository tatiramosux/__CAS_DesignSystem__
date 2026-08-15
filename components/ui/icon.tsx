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

// fontawesome-svg-core's stylesheet sets `.svg-inline--fa{width,height}` outside any
// Tailwind cascade layer, so it always beats the size-4/5/6 utility classes above —
// an explicit pixel size is required to actually control the rendered dimensions.
const sizePx: Record<CASIconSize, number> = { sm: 16, md: 20, lg: 24 };

export interface IconProps
  extends Omit<FontAwesomeIconProps, "size" | keyof VariantProps<typeof iconVariants>> {
  size?: CASIconSize;
}

export function Icon({ size = "md", className, style, ...props }: IconProps) {
  const px = sizePx[size];
  return (
    <FontAwesomeIcon
      className={cn(iconVariants({ size }), className)}
      style={{ width: px, height: px, ...style }}
      {...props}
    />
  );
}
