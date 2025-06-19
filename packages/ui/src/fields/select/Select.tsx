import "../fields.css";
import { isArray } from "@flowfixe/common";
import { validateField, StringField } from "@flowfixe/common";
import { useState } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { ExclamationCircle } from "../../icons";
import { type SelectOptionProps, SelectOption } from "./SelectOption";
import { translate } from "../../i18n";
import { useFormValue } from "../../form";

export interface SelectChangeState extends FieldState<string | null> {}

export interface SelectProps extends FieldProps<string> {
  placeholder?: string;
  required?: boolean;
  inline?: boolean;
  autoFocus?: boolean;
  width?: string;
  children?:
    | React.ReactElement<SelectOptionProps>
    | React.ReactElement<SelectOptionProps>[];
}

export const Select = ({
  name,
  label,
  placeholder = translate("fields.select.defaultPlaceholder"),
  aid,
  value,
  width = "100%",
  required = false,
  inline = false,
  readOnly = false,
  autoFocus = false,
  children,
  onChange,
}: SelectProps) => {
  const [, setFormValue] = useFormValue(name,value);
  const [state, setState] = useState<SelectChangeState>(
    getInitialValidState(value || null)
  );

  const options = isArray(children) ? children : [children];

  const getPlaceholder = () => {
    if (readOnly) return value || "";
    if (
      value &&
      options.findIndex((option) => option?.props.value == value) === -1
    )
      return value;
    return placeholder;
  };

  const toHandleBlur = (newValue: string): boolean => {
    return !readOnly && (newValue !== state.value || !newValue);
  };

  const handleBlur = (el: HTMLSelectElement) => {
    const newValue = el.value;
    if (!toHandleBlur(newValue)) return;
    const validation = validateField<string>(
      StringField.of(name, label).required(required).value(newValue)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as SelectChangeState;
    setFormValue(newValue)
    onChange && onChange({ ...newState });
    setState({ ...newState });
  };

  return (
    <div
      className={`ff-field-container${readOnly ? " ff-read-only" : ""}${
        inline ? " ff-field-inline" : ""
      }`}
      style={{ width }}
    >
      {!inline && (
        <div className="ff-field-label">
          {label && (
            <label>
              {label} {required && <small className="ff-required">*</small>}
            </label>
          )}
          {aid && (
            <div className="ff-aid">
              <small>{aid || ""}</small>
            </div>
          )}
        </div>
      )}
      <div className={`ff-field-value${!state.isValid ? " ff-error" : ""}`}>
        <select
          style={readOnly ? { pointerEvents: "none" } : {}}
          name={name}
          value={value}
          required={!readOnly && required}
          onChange={(e) => e.stopPropagation()}
          onBlur={(e) => handleBlur(e.target as HTMLSelectElement)}
          autoFocus={autoFocus}
        >
          <SelectOption value="" label={getPlaceholder()} />
          {options.map(
            (child) =>
              child && (
                <SelectOption
                  key={child.props.value}
                  {...child.props}
                  selected={
                    value && value === child.props.value ? true : undefined
                  }
                />
              )
          )}
        </select>
        {inline && (
          <div
            className={`ff-error-indicator${state.isValid ? "" : " show"}`}
            data-tooltip={state.errors.join("\n")}
            data-placement="bottom"
          >
            <div>
              <ExclamationCircle />
            </div>
          </div>
        )}
      </div>
      {!inline &&
        state.errors.map((error, i) => (
          <small key={`error${i}`} className="ff-error">
            {error}
          </small>
        ))}
    </div>
  );
};
