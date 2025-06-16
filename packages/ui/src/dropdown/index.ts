import { Dropdown as _Dropdown, type DropdownProps } from "./Dropdown";
import { DropdownItem, type DropdownItemProps } from "./DropdownItem";
import { DropdownMenu, type DropdownMenuProps } from "./DropdownMenu";
import { DropdownTrigger, type DropdownTriggerProps } from "./DropdownTrigger";

type DropdownCollection = typeof _Dropdown & {
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
  Trigger: typeof DropdownTrigger;
};

const Dropdown = _Dropdown as DropdownCollection;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Trigger = DropdownTrigger;

export {
  type DropdownProps,
  type DropdownItemProps,
  type DropdownMenuProps,
  type DropdownTriggerProps,
};

export default Dropdown;
