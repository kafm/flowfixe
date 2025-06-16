import "./layout.css";
import { type CSSProperties, useMemo } from "react";
import {
  type Spacing,
  type Size,
  type PropsWithChildrenAndCSS,
  getWidth,
  getHeight,
  getSpacing,
} from "./LayoutHelper";

export interface ContentProps extends PropsWithChildrenAndCSS {}

export interface HeaderProps extends PropsWithChildrenAndCSS {}

export interface FooterProps extends PropsWithChildrenAndCSS {}

export interface AsideProps extends PropsWithChildrenAndCSS {
  right?: boolean; // place aside on right
  full?: boolean; // overlay header if applies
  hidden?: boolean; //hides aside
}

export interface LayoutProps extends PropsWithChildrenAndCSS {
  spacing?: Spacing;
  rowSpacing?: Spacing;
  colSpacing?: Spacing;
  width?: Size;
  height?: Size;
}

export const Header = ({ className, style, children }: HeaderProps) => (
  <header className={className} style={style}>
    {children}
  </header>
);

export const Content = ({ className, style, children }: HeaderProps) => (
  <div className={className} style={style}>
    {children}
  </div>
);

export const Footer = ({ className, style, children }: HeaderProps) => (
  <footer className={className} style={style}>
    {children}
  </footer>
);

export const Aside = ({
  className,
  style,
  children,
  right,
  full,
  hidden,
}: AsideProps) => {
  const classNames = useMemo(() => {
    const classes = [right ? "ff-raside" : "ff-laside"];
    full && classes.push("ff-full");
    hidden && classes.push("ff-hidden");
    className && classes.push(className);
    return classes.join(" ");
  }, [className, right, full, hidden]);

  return (
    <aside className={classNames} style={style}>
      {children}
    </aside>
  );
};

export const Layout = ({
  spacing,
  rowSpacing,
  colSpacing,
  width,
  height,
  className,
  style,
  children,
}: LayoutProps) => {
  const [classNames, styles] = useMemo(() => {
    const classes = ["ff-layout"] as string[];
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
  }, [className, style, spacing, colSpacing, rowSpacing, width, height]);

  return (
    <div className={classNames} style={styles}>
      {children}
    </div>
  );
};
