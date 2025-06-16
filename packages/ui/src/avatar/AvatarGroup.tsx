import React from "react";

export interface AvatarGroupProps {
  variant?: "grid" | "overlay";
  children: React.ReactNode;
}

export const AvatarGroup = ({
  variant = "overlay",
  children
}: AvatarGroupProps) => {
  return (
    <div className={`ff-avatar-group-${variant}`}>
      {children}      
    </div>
  );
};
