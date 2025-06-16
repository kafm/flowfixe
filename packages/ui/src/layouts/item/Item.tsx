import "./item.css";
import { type CSSProperties, type PropsWithChildren, forwardRef, useMemo } from "react";
import { type Size, getWidth, getHeight } from "../LayoutHelper";

export interface ItemProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  align?: "top" | "center" | "bottom" | "stretch";
  justify?: "left" | "right" | "center";
  width?: Size;
  height?: Size;
  breakPoint?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { className, style, align, justify, width, height, breakPoint, children },
    ref
  ) => {
    const [classNames, styles] = useMemo(() => {
      const classes = ["ff-item"] as string[];
      const { className: widthClass, style: widthStyle } = getWidth(width);
      const { className: heightClass, style: heightStyle } = getHeight(height);
      widthClass && classes.push(widthClass);
      heightClass && classes.push(heightClass);
      align && classes.push(`ff-${align}`);
      justify && classes.push(`ff-${justify}`);
      breakPoint && classes.push(`ff-${breakPoint}`);
      console.log(breakPoint);
      className && classes.push(className);
      return [
        classes.join(" "),
        {
          ...widthStyle,
          ...heightStyle,
          ...style,
        } as CSSProperties,
      ];
    }, [className, align, justify, width, height, breakPoint]);

    return (
      <div ref={ref} className={classNames} style={styles}>
        {children}
      </div>
    );
  }
);
