import "../fields.css";
import { validateField, EmailField } from "@flowfixe/common";
import { useState } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { WarningCircle } from "../../icons";
import { useFormValue } from "../../form";

export interface EmailChangeState extends FieldState<string | null> {}

export interface EmailProps extends FieldProps<string> {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  inline?: boolean;
  autoFocus?: boolean;
  width?: string;
}

export const Email = ({
  name,
  label,
  placeholder,
  aid,
  minLength,
  maxLength,
  value,
  width = "100%",
  required = false,
  inline = false,
  readOnly = false,
  autoFocus = false,
  onChange,
}: EmailProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const [state, setState] = useState<EmailChangeState>(
    getInitialValidState(value || null)
  );

  const toHandleBlur = (newValue: string): boolean => {
    return !readOnly && (newValue !== state.value || !newValue);
  };

  const handleBlur = (el: HTMLInputElement) => {
    const newValue = el.value;
    if (!toHandleBlur(newValue)) return;
    const validation = validateField<string>(
      EmailField.of(name, label)
        .minLength(minLength || null)
        .maxLength(maxLength || null)
        .required(required)
        .value(newValue)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as EmailChangeState;
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
        <input
          type="text"
          name={name}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          required={!readOnly && required}
          onChange={(e) => e.stopPropagation()}
          onBlur={(e) => handleBlur(e.target as HTMLInputElement)}
          autoFocus={autoFocus}
        ></input>
        {inline && (
          <div
            className={`ff-error-indicator${state.isValid ? "" : " show"}`}
            data-tooltip={state.errors.join("\n")}
            data-placement="bottom"
          >
            <div>
              <WarningCircle />
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
