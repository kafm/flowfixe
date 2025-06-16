import React from "react";

export interface DropdownItemProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  strong?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  description,
  icon,
  shortcut,
  strong,
  disabled,
  onClick,
}: DropdownItemProps) => {
  return (
    <li
      className={`ff-dropdown-item ${disabled ? "disabled" : ""}`}
      onClick={() => !disabled && onClick?.()}
      tabIndex={-1}
    >
      {icon}
      <a>
        <div>
          {strong ? (
            <strong className="ff-text-truncate">{label}</strong>
          ) : (
            <span className="ff-text-truncate">{label}</span>
          )}
          {description && (
            <small className="ff-text-truncate">{description}</small>
          )}
        </div>
      </a>

      {shortcut && <div className="ff-dropdown-item-shutcut">{shortcut}</div>}
    </li>
  );
};

DropdownItem.displayName = "DropdownItem";
