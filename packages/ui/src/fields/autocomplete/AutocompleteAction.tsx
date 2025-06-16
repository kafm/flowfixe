import React from "react";

export interface AutocompleteActionProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export const AutocompleteAction = ({
  name,
  icon,
  onClick,
}: AutocompleteActionProps) => {
  return (
    <div className="ff-autocomplete-action">
      <a onMouseDown={(e) => e.preventDefault()} onMouseUp={() => onClick()}>
        {icon}
        <span>{name}</span>
      </a>
    </div>
  );
};
