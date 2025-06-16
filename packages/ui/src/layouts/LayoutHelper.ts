import { type CSSProperties, type PropsWithChildren } from "react";

export const builtinSpacing = ["tiny", "sm", "md", "lg", "xl", "2xl"];
export const builtinSize = ["auto", "grow", "full"];
export const builtinColor = [
  "main",
  "primary",
  "danger",
  "dark",
  "muted",
  "warning",
  "success",
  "light",
];

export type Spacing = (typeof builtinSpacing)[number] | string;
export type Size = (typeof builtinSize)[number] | string;
export type Color = (typeof builtinColor)[number] | string;

export interface PropsWithChildrenAndCSS extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}

export const getSpacing = (
  value?: string,
  orientation?: string
): { className?: string; style?: CSSProperties } => {
  if (!value) {
    return {};
  }
  if (builtinSpacing.includes(value)) {
    const prefix = orientation ? "-" + orientation + "-" : "-";
    return { className: `ff-spacing${prefix}${value}` };
  }
  if (orientation === "v") {
    return { style: { columnGap: value } };
  } else if (orientation === "h") {
    return { style: { rowGap: value } };
  }
  return { style: { gap: value } };
};

const getSize = (
  value: string | undefined,
  orientation: string
): { className?: string; style?: CSSProperties } => {
  if (!value) return {};
  if (builtinSize.includes(value)) {
    return { className: `ff-${orientation ? orientation + "-" : ""}${value}` };
  }
  const style = orientation === "width" ? { width: value } : { height: value };
  return { style };
};

export const getWidth = (value?: string) => getSize(value, "width");

export const getHeight = (value?: string) => getSize(value, "height");

export const mergeClasses = (...classNames: (string | undefined | false | null)[]) =>
  classNames?.filter((c) => !!c).join(" ") || "";

export const getColor = (
  value: string | undefined,
  styleCallback?: (color: string) => CSSProperties
): { className?: string; style?: CSSProperties } => {
  if (value) {
    if (builtinColor.includes(value)) return { className: `ff-${value}` };
    else if (styleCallback) {
      return { style: styleCallback(value) };
    }
  }
  return {};
};
