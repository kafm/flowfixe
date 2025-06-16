import React from "react";
import { isArray, defaultTo } from "@flowfixe/common";
import { getColor as getColorCode } from "../helpers";
import { type AutocompleteOptionProps } from "./AutocompleteOption";
import { type AutocompleteActionProps } from "./AutocompleteAction";
import Avatar from "../../avatar";

export type AllowedChildren =
  | React.ReactElement<AutocompleteOptionProps>
  | React.ReactElement<AutocompleteActionProps>;

export type AsyncFilter = (
  keywords: string
) => Promise<AutocompleteOptionProps[]>;

export type FilterLoadingCallback = () => void;

export type ErrorCallback = (error: Error) => void;

export type FilterCallback = (options: AutocompleteOptionProps[]) => void;

export const getColor = (selected: AutocompleteOptionProps) => {
  if (selected.color) {
    const { color, value, label } = selected;
    return (
      <div
        className="ff-autocomplete-color-badge"
        style={{ background: getColorCode(color) }}
      >
        {label || value}
      </div>
    );
  }
  return undefined;
}

export const getAvatar = (selected: AutocompleteOptionProps) => {
  if (selected.avatar) {
    const { avatar, avatarType } = selected;
    return defaultTo(avatarType, "image") === "image" ? (
      <div className="ff-autocomplete-avatar">
        <Avatar src={avatar} size="tiny" />
      </div>
    ) : (
      <div className="ff-autocomplete-avatar">
        <Avatar name={avatar} size="tiny" />
      </div>
    );
  }
  return undefined;
};

export const splitActionsAndProps = (
  children: AllowedChildren | AllowedChildren[]
): {
  options: AutocompleteOptionProps[];
  actions: AutocompleteActionProps[];
} => {
  const childrens = (
    isArray(children) ? children : [children.props]
  ) as AllowedChildren[];
  const actions: AutocompleteActionProps[] = [];
  const options: AutocompleteOptionProps[] = [];
  childrens.forEach((child) => {
    if("value" in child.props) {
      options.push(child.props as AutocompleteOptionProps);
    } else {
      actions.push(child.props as AutocompleteActionProps);
    }
  });
  return { options, actions };
};
