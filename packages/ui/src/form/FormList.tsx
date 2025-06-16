import "./form.css";
import React, { useState } from "react";
import { map, filter, concat, isEmpty } from "@flowfixe/common";
import {
  type FormValues,
  FormContext,
  FormHandler,
  useFormContext,
} from "./FormContext";

export interface FormListProps {
  name: string;
  label?: string;
  items?: FormValues[];
  required?: boolean;
  readOnly?: boolean;
  children: (
    items: FormValues[],
    ops: {
      add: (item: FormValues) => any;
      update: (item: FormValues, index: number) => any;
      remove: (index: number) => any;
    }
  ) => React.ReactElement;
}

const FormList = ({
  name,
  label,
  items = [],
  required = false,
  readOnly = false,
  children,
}: FormListProps) => {
  const [formEntries, setFormEntries] = useState([...items]);
  const context = useFormContext();
  const listHandler = new FormHandler({ [name]: formEntries });

  const propagateChanges = (entries: FormValues[]) => {
    context.setProperty(name, entries);
    setFormEntries(entries);
  };

  const add = (...item: FormValues[]) => propagateChanges(concat(formEntries, item));

  const update = (item: FormValues, index: number) =>
    propagateChanges(
      map(formEntries, (entry, i) => (i === index ? item : entry))
    );

  const remove = (index: number) =>
    propagateChanges(filter(formEntries, (_, i) => i !== index));

  if (children && typeof children !== "function") {
    console.error("Form list requires a function as a children");
    return null;
  }

  return (
    <FormContext.Provider value={listHandler}>
      <div className="ff-form-list">
        {label && <strong className="ff-form-list-label">{label}</strong>}
        {!readOnly && (
          <input
            className="ff-form-list-value"
            name={name}
            required={required}
            value={
              isEmpty(formEntries) ? undefined : JSON.stringify(formEntries)
            }
          />
        )}
        <div>{children?.(formEntries, { add, update, remove })}</div>
      </div>
    </FormContext.Provider>
  );
};

export default FormList;
