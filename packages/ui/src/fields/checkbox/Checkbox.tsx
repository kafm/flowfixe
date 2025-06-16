import "../fields.css";
import "./checkbox.css";
import { type FieldState, type FieldProps, getValidState } from "../helpers";
import { useFormValue } from "../../form";

export interface CheckboxChangeState extends FieldState<boolean> {}

export interface CheckboxProps extends FieldProps<boolean> {
  inline?: boolean;
  readOnly?: boolean;
  variant?: "default" | "switch";
  width?: string;
}

export const Checkbox = ({
  name,
  label,
  aid,
  value = false,
  width = "100%",
  variant = "default",
  inline = false,
  readOnly = false,
  onChange,
}: CheckboxProps) => {
  let oldValue = value;
  const [, setFormValue] = useFormValue(name, value);
  const toHandleToggle = (newValue: boolean): boolean => {
    return !readOnly && newValue !== oldValue;
  };

  const handleToggle = (el: HTMLInputElement) => {
    const newValue = el.checked;
    if (!toHandleToggle(newValue)) return;
    setFormValue(newValue);
    onChange && onChange(getValidState(newValue, oldValue));
    oldValue = newValue;
  };

  return (
    <div
      className={`ff-field-container${readOnly ? " ff-read-only" : ""}${
        inline ? " ff-field-inline" : ""
      }`}
      style={{ width }}
    >
      {aid && (
        <div className="ff-checkbox-aid">
          <small>{aid}</small>
        </div>
      )}
      <div className="ff-checkbox-container">
        <input
          type="checkbox"
          className={`ff-checkbox-${variant}`}
          id={name}
          name={name}
          defaultChecked={value}
          readOnly={readOnly}
          onChange={(e) => e.stopPropagation()}
          onClick={(e) => handleToggle(e.target as HTMLInputElement)}
          role={
            variant === "switch"
              ? `switch${readOnly ? "_disabled" : ""}`
              : undefined
          }
        />
        {label && (
          <label className="ff-checkbox-label" htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};
