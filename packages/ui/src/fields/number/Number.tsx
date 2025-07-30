import "../fields.css";
import "./number.css";
import {
  toNumber,
  validateField,
  NumberField,
  NumberFormatter,
} from "@flowfixe/common";
import { useState, useMemo } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { ExclamationCircle } from "../../icons";
import { getLang } from "../../i18n";
import { useFormValue } from "../../form";

export interface NumberChangeState extends FieldState<number | null> {}

export interface NumberProps extends FieldProps<number> {
  placeholder?: string;
  min?: number;
  max?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalNumDigits?: number;
  prefix?: string;
  suffix?: string;
  integer?: boolean;
  required?: boolean;
  inline?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  width?: string;
}

export const Number = ({
  name,
  label,
  placeholder,
  aid,
  min,
  max,
  value,
  thousandsSeparator = "",
  decimalSeparator = ".",
  decimalNumDigits = 2,
  prefix = "",
  suffix = "",
  width = "100%",
  integer = false,
  required = false,
  inline = false,
  readOnly = false,
  autoFocus = false,
  onChange,
}: NumberProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const [state, setState] = useState<NumberChangeState>(
    getInitialValidState(value || null)
  );

  const formatter = useMemo<NumberFormatter>(
    () =>
      new NumberFormatter()
        .asInteger(integer)
        .withThousandsSeparator(thousandsSeparator)
        .withDecimalSeparator(decimalSeparator)
        .withDecimalNumDigits(decimalNumDigits)
        .withPrefix(prefix)
        .withSuffix(suffix),
    []
  );

  const toHandleBlur = (newValue: number | null): boolean => {
    return !readOnly && (newValue !== state.value || !newValue);
  };

  const handleBlur = (el: HTMLInputElement) => {
    const newValue = toNumber(el.value);
    if (!toHandleBlur(newValue)) return;
    const validation = validateField<number>(
      NumberField.of(name, label)
        .min(min)
        .max(max)
        .required(required)
        .value(newValue),
      getLang()
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as NumberChangeState;
    setFormValue(newValue!)
    onChange && onChange({ ...newState });
    setState({ ...newState });
  };

  return (
    <div
      className={`ff-field-container ff-number-field${
        readOnly ? " ff-read-only" : ""
      }${inline ? " ff-field-inline" : ""}`}
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
        <div className="ff-number-formatted">
          <span>{formatter.format(state.value!)}</span>
        </div>
        <input
          type="number"
          name={name}
          min={min}
          max={max}
          placeholder={placeholder}
          readOnly={readOnly}
          defaultValue={value}
          required={!readOnly && required}
          onChange={(e) => e.stopPropagation()}
          onBlur={(e) => handleBlur(e.target as HTMLInputElement)}
          autoFocus={autoFocus}
        />
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
