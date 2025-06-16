import { type ChangeEvent } from "react";
import "../fields.css";
import "./radio.css";

export interface RadioProps {
  value: string;
  id?: string
  name?: string;
  label?: string;
  checked?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}

export const Radio = ({
  id,
  name,
  value,
  label,
  checked = false,
  required = false,
  onChange,
}: RadioProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange && onChange(value);
  };

  return (
    <label className="ff-radio-option" htmlFor={value}>
      <input
        name={name}
        type="radio"
        id={id || `${name}-${value}`}
        value={value}
        defaultChecked={checked}
        required={required}
        onChange={handleChange}
      />
      {label || value}
    </label>
  );
};