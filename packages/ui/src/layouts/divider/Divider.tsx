import "./divider.css";
import { type CSSProperties, type PropsWithChildren, useMemo } from "react";
import { type Spacing, type Color, getColor, getSpacing } from "../LayoutHelper";

export interface DividerProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  position: "start" | "end" | "center";
  spacing?: Spacing;
  color?: Color;
}

const Divider = ({
  color = "light",
  position = "center",
  spacing = "md",
  orientationClass,
  className,
  style,
  children,
}: DividerProps & { orientationClass?: string }) => {
  const [classNames, styles] = useMemo(() => {
    const classes = ["ff-divider"] as string[];
    const { className: spacingClassName, style: spacingStyle } =
      getSpacing(spacing);
    const { className: colorClassName, style: colorStyle } = getColor(
      color,
      (color) => ({ background: color })
    );
    orientationClass && classes.push(orientationClass);
    spacingClassName && classes.push(spacingClassName);
    colorClassName && classes.push(colorClassName);
    position && classes.push(`ff-${position}`);
    className && classes.push(className);
    return [
      classes.join(" "),
      {
        ...spacingStyle,
        ...colorStyle,
        ...style,
      } as CSSProperties,
    ];
  }, [color, position, spacing]);

  return (
    <div className={classNames} style={styles}>
      <div>{children}</div>
    </div>
  );
};

export const HDivider = (props: DividerProps) => (
  <Divider {...props} orientationClass="ff-horizontal" />
);

export const VDivider = (props: DividerProps) => <Divider {...props} />;
