import "../fields.css";
import "./datePicker.css";
import { useState, useRef } from "react";
import {
  toDate,
  // validateField,
  // DateField,
  DEFAULT_DATE_FORMAT,
  isDatesEqual,
  DateField,
  validateField,
  DEFAULT_DATETIME_FORMAT,
  formatDate,
} from "@flowfixe/common";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { Calendar, WarningCircle } from "../../icons";
import { useFormValue } from "../../form";
export interface DatePickerChangeState
  extends FieldState<Date | null | string> {}

export interface DatePickerProps extends FieldProps<Date | string> {
  placeholder?: string;
  min?: Date;
  max?: Date;
  required?: boolean;
  inline?: boolean;
  autoFocus?: boolean;
  width?: string;
  format?: string;
  showTime?: boolean;
  dateAsString?: boolean;
}

export const DatePicker = ({
  name,
  label,
  placeholder,
  aid,
  min,
  max,
  value,
  onChange,
  required = false,
  inline = false,
  readOnly = false,
  autoFocus = false,
  showTime = false,
  dateAsString = false,
  width = "100%",
}: DatePickerProps) => {
  const [, setFormValue] = useFormValue(name, value || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<DatePickerChangeState>(
    getInitialValidState(toDate(value))
  );
  const inputFormat = showTime ? DEFAULT_DATETIME_FORMAT : DEFAULT_DATE_FORMAT;

  const cleanDate = (date: Date | null): Date | null => {
    if (date && !showTime) {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
    }
    return date;
  };

  const toCleanDate = (date: any): Date | null => cleanDate(toDate(date));

  const toDateInputString = (date: any) => formatDate(date, inputFormat) || undefined;

  const toHandleChange = (newValue: Date | null): boolean =>
    !readOnly && !isDatesEqual(state.value as Date, newValue);

  const changeHandler = (timestamp?: number) => {
    const newDate = toCleanDate(timestamp);
    if (!toHandleChange(newDate)) return;
    const validation = validateField<Date>(
      DateField.of(name, label)
        .min(min || null)
        .max(max || null)
        .required(required)
        .value(newDate)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, value),
      (newValue) => getValidState(newValue, state.value)
    ) as DatePickerChangeState;
    setFormValue(newDate);
    onChange && onChange({ ...newState });
    setState({
      ...newState,
      value: dateAsString ? formatDate(newState.value) : newState.value,
    });
  };

  return (
    <div
      className={`ff-field-container ff-field-datepicker ${readOnly ? "ff-read-only" : ""}${
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
          ref={inputRef}
          type={showTime ? "datetime-local" : "date"}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          defaultValue={toDateInputString(value)}
          required={!readOnly && required}
          autoFocus={!readOnly && autoFocus}
          min={toDateInputString(min)}
          max={toDateInputString(max)}
          onBlur={(e) => changeHandler(e.target?.valueAsNumber)}
        />
        <button onClick={() => inputRef.current?.showPicker()} type="button">
          <Calendar />
        </button>
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
