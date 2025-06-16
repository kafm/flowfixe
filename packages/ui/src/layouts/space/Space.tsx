import "./space.css";
import { type CSSProperties, type PropsWithChildren, forwardRef, useMemo } from "react";
import { type Spacing, getSpacing } from "../LayoutHelper";

export interface SpaceProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  spacing?: Spacing;
  rowSpacing?: Spacing;
  colSpacing?: Spacing;
  outsize?: boolean;
}

export const Space = forwardRef<HTMLDivElement, SpaceProps>(
  (
    {
      className,
      style,
      spacing = "md",
      rowSpacing,
      colSpacing,
      outsize,
      children,
    },
    ref
  ) => {
    const [classNames, styles] = useMemo(() => {
      const classes = ["ff-space"] as string[];
      const { className: spacingClass, style: spacingStyle } =
        getSpacing(spacing);
      const { className: rowSpacingClass, style: rowSpacingStyle } =
        getSpacing(rowSpacing);
      const { className: columnSpacingClass, style: columnSpacingStyle } =
        getSpacing(colSpacing);
      spacingClass && classes.push(spacingClass);
      rowSpacingClass && classes.push(rowSpacingClass);
      columnSpacingClass && classes.push(columnSpacingClass);
      outsize && classes.push("ff-outsize");
      className && classes.push(className);
      return [
        classes.join(" "),
        {
          ...spacingStyle,
          ...rowSpacingStyle,
          ...columnSpacingStyle,
          ...style,
        } as CSSProperties,
      ];
    }, [spacing, colSpacing, rowSpacing]);

    return (
      <div ref={ref} className={classNames} style={styles}>
        {children}
      </div>
    );
  }
);
