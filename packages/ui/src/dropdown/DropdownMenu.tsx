import React from "react";

export interface DropdownMenuProps {
  width?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  children,
}: DropdownMenuProps) => {
  return (
    <ul
      role="listbox"
      className="ff-dropdown-menu"
      style={{
        minWidth: width,
        maxWidth: "100%",
        height,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      }}
    >
      {children}
    </ul>
  );
};

DropdownMenu.displayName = "DropdownMenu";