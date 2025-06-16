import "./autocomplete.css";
import { getColor } from "../helpers";
import Avatar from "../../avatar";

export interface AutocompleteOptionProps {
  value: string;
  label?: string;
  color?: string;
  avatar?: string;
  avatarType?: "image" | "name";
  highlighted?: boolean;
  onSelect?: (props: AutocompleteOptionProps) => void;
}

export const AutocompleteOption = (props: AutocompleteOptionProps) => {
  const {
    value,
    label,
    color,
    avatar,
    highlighted = false,
    avatarType = "image",
    onSelect,
  } = props;
  const avatarSrc = avatarType === "image" ? avatar : undefined;
  const avatarName = !avatarSrc ? avatar : label || value;
  const background = color ? getColor(color) : undefined;

  return (
    <li className={highlighted ? "ff-highlight-option" : undefined}>
      <a
        onMouseDown={(e) => e.preventDefault()}
        onMouseUp={() =>
          onSelect?.({
            ...props,
            color: background,
            avatar: avatarSrc || avatarName,
            avatarType,
          })
        }
      >
        <div
          className={background ? "ff-autocomplete-colored-option" : undefined}
        >
          {avatar && <Avatar name={avatarName} src={avatarSrc} size="tiny" />}
          <span style={{ background }}>{label || value}</span>
        </div>
      </a>
    </li>
  );
};
