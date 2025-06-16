import React from "react";

export interface DropdownTriggerProps {
  children: React.ReactNode;
}

/** TODO HANDLE TYPE OF EVENT THAT TRIGGERS THE DROPDOWN */

export const DropdownTrigger:React.FC<DropdownTriggerProps> = ({ children }: DropdownTriggerProps) => {
  return (
    <div className="ff-dropdown-trigger">
      {children}
    </div>
  );
};

DropdownTrigger.displayName = "DropdownTrigger";
