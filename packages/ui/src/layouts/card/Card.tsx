import "./card.css";
import {
  type PropsWithChildrenAndCSS,
  type Color,
  type Size,
  type Spacing,
  mergeClasses,
  getWidth,
  getHeight,
  getColor,
  getSpacing,
} from "../LayoutHelper";
import { type CSSProperties, forwardRef, useMemo } from "react";

export interface CardMediaProps extends PropsWithChildrenAndCSS {}

export interface CardTitleProps extends PropsWithChildrenAndCSS {}

export interface CardDescriptionProps extends PropsWithChildrenAndCSS {}

export interface CardContentProps extends PropsWithChildrenAndCSS {}

export interface CardActionsProps extends PropsWithChildrenAndCSS {
  spacing?: Spacing;
}

export interface CardProps extends PropsWithChildrenAndCSS {
  variant?: "outline" | "elevated" | "clean" | "light";
  color?: Color;
  width?: Size;
  height?: Size;
  spacing?: Spacing;
  align: "left" | "right" | "center";
  horizontal?: boolean;
}

const _Media = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, style, children }, ref) => (
    <div
      ref={ref}
      className={mergeClasses("ff-card-media", className)}
      style={style}
    >
      {children}
    </div>
  )
);

const _Title = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, style, children }, ref) => (
    <div
      ref={ref}
      className={mergeClasses("ff-card-title", className)}
      style={style}
    >
      {children}
    </div>
  )
);

const _Description = forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, style, children }, ref) => (
    <div
      ref={ref}
      className={mergeClasses("ff-card-desc", className)}
      style={style}
    >
      {children}
    </div>
  )
);

const _Content = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, style, children }, ref) => (
    <div
      ref={ref}
      className={mergeClasses("ff-card-content", className)}
      style={style}
    >
      {children}
    </div>
  )
);

const _Actions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ spacing, className, style, children }, ref) => {
    const { className: spacingClass, style: spacingStyle } = useMemo(
      () => getSpacing(spacing),
      [spacing]
    );

    return (
      <div>
        <div ref={ref}
          className={mergeClasses("ff-card-actions", spacingClass, className)}
          style={{ ...spacingStyle, ...style }}
        >
          {children}
        </div>
      </div>
    );
  }
);

const _Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "outline",
      color,
      width,
      height,
      align = "left",
      spacing = "md",
      horizontal,
      className,
      style,
      children,
    },
    ref
  ) => {
    const [classNames, styles] = useMemo(() => {
      const classes = ["ff-layout"] as string[];
      const { className: widthClass, style: widthStyle } = getWidth(width);
      const { className: heightClass, style: heightStyle } = getHeight(height);
      const { className: spacingClass, style: spacingStyle } =
        getSpacing(spacing);
      const { className: colorClass, style: colorStyle } = getColor(
        color,
        (c) => ({ "--ff-card-color": c }) as CSSProperties
      );
      className && classes.push(className);
      return [
        mergeClasses(
          "ff-card",
          spacingClass,
          widthClass,
          heightClass,
          colorClass,
          `ff-${align}`,
          horizontal && "ff-horizontal",
          variant && `ff-variant-${variant}`,
          className
        ),
        {
          ...colorStyle,
          ...widthStyle,
          ...heightStyle,
          ...spacingStyle,
          ...style,
        } as CSSProperties,
      ];
    }, [
      className,
      style,
      variant,
      color,
      horizontal,
      align,
      spacing,
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

type CardCollection = typeof _Card & {
  Media: typeof _Media;
  Title: typeof _Title;
  Description: typeof _Description;
  Content: typeof _Content;
  Actions: typeof _Actions;
};

export const Card = _Card as CardCollection;
Card.Title = _Title;
Card.Description = _Description;
Card.Media = _Media;
Card.Content = _Content;
Card.Actions = _Actions;
