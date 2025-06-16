import { type CSSProperties, type PropsWithChildren, forwardRef } from "react";
import { type Spacing, type Size } from "../LayoutHelper";
import { Box } from "../box/Box";

export interface StackProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  spacing?: Spacing;
  align?: "top" | "center" | "bottom" | "stretch";
  justify?: "left" | "right" | "center" | "between" | "around" | "evenly";
  width?: Size;
  height?: Size;
  reverse?: boolean;
}

export const HStack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      style,
      spacing,
      align,
      justify,
      width,
      height,
      reverse,
      children,
    },
    ref
  ) => {
    const reverseClass = reverse
      ? "ff-direction-row-reverse"
      : "ff-direction-row";
    return (
      <Box
        ref={ref}
        className={`${reverseClass} ${className || ""}`}
        style={style}
        spacing={spacing}
        align={align}
        justify={justify}
        width={width}
        height={height}
      >
        {children}
      </Box>
    );
  }
);

export const VStack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      style,
      spacing,
      align,
      justify,
      width,
      height,
      reverse,
      children,
    },
    ref
  ) => {
    const reverseClass = reverse
      ? "ff-direction-column-reverse"
      : "ff-direction-column";
    return (
      <Box
        ref={ref}
        className={`${reverseClass} ${className || ""}`}
        style={style}
        spacing={spacing}
        align={align}
        justify={justify}
        width={width}
        height={height}
      >
        {children}
      </Box>
    );
  }
);
