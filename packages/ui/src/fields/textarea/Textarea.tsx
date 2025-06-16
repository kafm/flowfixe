import "../fields.css";
import "./textarea.css";
import { validateField, StringField } from "@flowfixe/common";
import { useEffect, useRef, useState } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { WarningCircle } from "../../icons";
import { useFormValue } from "../../form";

export interface TextareaChangeState extends FieldState<string> {}

export interface TextareaProps extends FieldProps {
  type?: "text";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  regex?: RegExp;
  regexError?: string;
  inline?: boolean;
  autoFocus?: boolean;
  width?: string;
  autoGrow?: boolean;
  value?: string;
}

export const Textarea = ({
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
  autoGrow = false,
  onChange,
}: TextareaProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<TextareaChangeState>(
    getInitialValidState(value!)
  );

  useEffect(() => handleGrow(), [value]);

  const toHandleBlur = (newValue: string): boolean => {
    return !readOnly && (newValue !== state.value || !newValue);
  };

  const handleBlur = (el: HTMLTextAreaElement) => {
    const newValue = el.value;
    if (!toHandleBlur(newValue)) return;
    const validation = validateField<string>(
      StringField.of(name, label)
        .minLength(minLength!)
        .maxLength(maxLength!)
        .required(required)
        .match(regex!, regexError)
        .value(newValue)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as TextareaChangeState;
    setFormValue(newValue);
    onChange && onChange({ ...newState });
    setState({ ...newState });
  };

  const handleGrow = () => {
    const el = ref.current;
    const parent = el?.parentNode as HTMLElement;
    if (!el || !parent || !autoGrow) return;
    parent.dataset.value = el.value;
  };

  const renderTextarea = () => (
    <textarea
      ref={ref}
      name={name}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      required={!readOnly && required}
      onChange={(e) => e.stopPropagation()}
      onInput={handleGrow}
      onBlur={(e) => handleBlur(e.target as HTMLTextAreaElement)}
      autoFocus={autoFocus}
    ></textarea>
  );

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
        {
          autoGrow ? (
            <div className="ff-textarea-autogrow">{renderTextarea()}</div>
          ) : (
            renderTextarea()
          )
          //   ?
          //   : this.renderTextarea()
        }
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
