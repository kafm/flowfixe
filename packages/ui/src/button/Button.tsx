import "./button.css";
import React, { forwardRef } from "react";

export interface ButtonProps {
  name?: string;
  label?: string;
  tip?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  size?: "tiny" | "sm" | "md" | "lg" | "xl";
  skin?:
    | "default"
    | "primary"
    | "danger"
    | "dark"
    | "warning"
    | "success"
    | "light";
  variant?: "outline" | "text" | "link" | "normal";
  disabled?: boolean;
  stretch?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      name,
      label,
      tip,
      icon,
      iconPosition = "left",
      type = "button",
      size = "md",
      skin = "primary",
      variant = "normal",
      disabled = false,
      stretch = false,
      loading = false,
      onClick,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        name={name}
        type={type}
        aria-busy={loading}
        data-tooltip={tip}
        data-placement={tip && "bottom"}
        className={`ff-button ff-${variant} ff-${skin} ff-${size} ${
          stretch ? " ff-stretch" : ""
        }`}
        disabled={loading || disabled}
        onClick={onClick}
      >
        {icon && iconPosition === "left" && icon}
        {label && <span>{label}</span>}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);
