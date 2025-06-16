import "../fields.css";
import "./radio.css";
import { isArray } from "@flowfixe/common";
import { StringField, validateField } from "@flowfixe/common";
import { useState } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
} from "../helpers";
import { Radio, type RadioProps } from "./Radio";
import { useFormValue } from "../../form";

export interface RadioChangeState extends FieldState<string | null> {}

export interface RadioGroupProps extends FieldProps<string> {
  required?: boolean;
  width?: string;
  children?: React.ReactElement<RadioProps> | React.ReactElement<RadioProps>[];
}

export const RadioGroup = ({
  name,
  label,
  aid,
  value = "",
  width = "100%",
  required = false,
  readOnly = false,
  children,
  onChange,
}: RadioGroupProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const [state, setState] = useState<RadioChangeState>(
    getInitialValidState(value || null)
  );

  const getOptions = () => (isArray(children) ? children : [children]);

  const toHandleChange = (newValue: string): boolean => {
    return !readOnly && (newValue !== state.value || !newValue);
  };

  const handleChange = (newValue: string) => {
    if (!toHandleChange(newValue)) return;
    const validation = validateField<string>(
      StringField.of(name, label).required(required).value(newValue)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as RadioChangeState;
    setFormValue(newValue);
    onChange && onChange({ ...newState });
    setState({ ...newState });
  };

  return (
    <fieldset
      className={`ff-field-container${readOnly ? " ff-read-only" : ""}`}
      style={{ width }}
    >
      <legend className="ff-field-label">
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
      </legend>
      {getOptions().map((child, i) => child && (
        <Radio
          {...child.props}
          id={`${name}-${i}`}
          name={name}
          checked={child.props.value == state.value}
          key={child.props.value}
          required={!readOnly && required}
          onChange={handleChange}
        />
      ))}
    </fieldset>
  );
};
