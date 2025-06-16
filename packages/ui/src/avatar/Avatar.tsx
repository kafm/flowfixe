import "./avatar.css";
import React from "react";
import { getColor } from "../utils";

type Color =
  | string
  | "dark"
  | "primary"
  | "danger"
  | "muted"
  | "warning"
  | "success"
  | "light";

export interface AvatarProps {
  name?: string;
  tip?: string;
  src?: string;
  icon?: React.ReactNode;
  size?: "tiny" | "sm" | "md" | "lg";
  color?: Color;
  disabled?: boolean;
  border?: boolean;
  borderColor?: Color;
}

export const Avatar = ({
  name,
  tip,
  size = "md",
  src,
  icon,
  color = "primary",
  disabled = false,
  border = false,
  borderColor = "primary",
}: AvatarProps) => {

  const getNonImageAvatar = () => {
    if (icon) return icon;
    return <strong>{name}</strong>;
  };

  return (
    <div
      className={`ff-avatar ff-${size}${border ? ` ff-bordered` : ""}`}
      data-disabled={disabled}
      style={{
        borderColor: getColor(borderColor),
        background: !src ? getColor(color) : undefined,
        color: color === "light" ? "var(--ff-text-default)" : undefined,
      }}
      data-tooltip={tip}
      data-placement={tip && "bottom"}
    >
      {src ? <img src={src} /> : getNonImageAvatar()}
    </div>
  );
};
