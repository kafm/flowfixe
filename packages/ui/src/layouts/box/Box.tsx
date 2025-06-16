import "./box.css";
import { type CSSProperties, type PropsWithChildren, forwardRef, useMemo } from "react";
import {
  type Spacing,
  type Size,
  getWidth,
  getHeight,
  getSpacing,
} from "../LayoutHelper";

export interface BoxProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  spacing?: Spacing;
  rowSpacing?: Spacing;
  colSpacing?: Spacing;
  align?: "top" | "center" | "bottom" | "stretch";
  justify?: "left" | "right" | "center" | "between" | "around" | "evenly";
  inline?: boolean;
  width?: Size;
  height?: Size;
  noWrap?: boolean;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      style,
      spacing,
      rowSpacing,
      colSpacing,
      align,
      justify,
      inline,
      width,
      height,
      noWrap,
      children,
    },
    ref
  ) => {
    const [classNames, styles] = useMemo(() => {
      const classes = ["ff-box"] as string[];
      const { className: widthClass, style: widthStyle } = getWidth(width);
      const { className: heightClass, style: heightStyle } = getHeight(height);
      const { className: spacingClass, style: spacingStyle } =
        getSpacing(spacing);
      const { className: rowSpacingClass, style: rowSpacingStyle } =
        getSpacing(rowSpacing);
      const { className: columnSpacingClass, style: columnSpacingStyle } =
        getSpacing(colSpacing);
      widthClass && classes.push(widthClass);
      heightClass && classes.push(heightClass);
      spacingClass && classes.push(spacingClass);
      rowSpacingClass && classes.push(rowSpacingClass);
      columnSpacingClass && classes.push(columnSpacingClass);
      inline && classes.push("ff-inline");
      !noWrap && classes.push(`ff-wrap`);
      align && classes.push(`ff-${align}`);
      justify && classes.push(`ff-${justify}`);
      className && classes.push(className);
      return [
        classes.join(" "),
        {
          ...widthStyle,
          ...heightStyle,
          ...spacingStyle,
          ...rowSpacingStyle,
          ...columnSpacingStyle,
          ...style,
        } as CSSProperties,
      ];
    }, [
      className,
      style,
      spacing,
      colSpacing,
      rowSpacing,
      align,
      justify,
      inline,
      width,
      height,
    ]);

    return (
      <div ref={ref} className={classNames} style={styles}>
        {children}
      </div>
    );
  }
);
