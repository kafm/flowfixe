import "./button.css";
import { forwardRef, type PropsWithChildren } from "react";

export interface ButtonGroupProps extends PropsWithChildren {
  variant: "outline" | "text" | "normal" | "clean";
  size?: "tiny" | "sm" | "md" | "lg" | "xl";
  skin?:
    | "default"
    | "primary"
    | "danger"
    | "dark"
    | "warning"
    | "success"
    | "light";
  vertical?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      skin = "default",
      variant = "normal",
      size = "md",
      vertical,
      children,
    },
    ref
  ) => (
    <div
      ref={ref}
      className={`ff-button-group ff-${variant} ff-${skin} ff-${size} ${vertical ? "ff-vertical" : ""}`}
    >
      {children}
    </div>
  )
);
