import "../fields.css";
import "./secret.css";
import { validateField, StringField } from "@flowfixe/common";
import { useState } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { EyeSlash, Eye, ExclamationCircle } from "../../icons";
import { useFormValue } from "../../form";

export interface SecretChangeState extends FieldState<string | null> {}

export interface SecretProps extends FieldProps<string> {
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  regex?: RegExp;
  regexError?: string;
  inline?: boolean;
  autoFocus?: boolean;
  width?: string;
  toggleVisibility?: boolean;
}

export const Secret = ({
  name,
  label,
  placeholder,
  aid,
  minLength,
  maxLength,
  value,
  regex,
  regexError,
  width = "100%",
  required = false,
  inline = false,
  readOnly = false,
  autoFocus = false,
  toggleVisibility = false,
  onChange,
}: SecretProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const [visible, setVisibility] = useState<boolean>(false);
  const [state, setState] = useState<SecretChangeState>(
    getInitialValidState(value || null)
  );

  const toHandleBlur = (newValue: string): boolean => {
    return !readOnly && (newValue !== state.value || !newValue);
  };

  const handleBlur = (el: HTMLInputElement) => {
    const newValue = el.value;
    if (!toHandleBlur(newValue)) return;
    const validation = validateField<string>(
      StringField.of(name, label)
        .minLength(minLength || null)
        .maxLength(maxLength || null)
        .required(required)
        .match(regex || null, regexError)
        .value(newValue)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as SecretChangeState;
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
          type={visible ? "text" : "password"}
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
        {toggleVisibility && (
          <div
            className="ff-toggle-secret"
            onClick={() => setVisibility(!visible)}
          >
            <div>
              {visible ? <Eye /> : <EyeSlash />}
            </div>
          </div>
        )}
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
