"use client";
import React, { useEffect } from "react";
import { keys, isEqual } from "@flowfixe/common";

export interface FormValues {
  [key: string]: any;
}

export class FormHandler {
  private data: FormValues;
  changeHandler?: (data: FormValues) => any;
  constructor(data: FormValues = {}) {
    this.data = data;
  }

  getProperty<T>(name: string): T {
    return this.data[name];
  }

  setProperty(name: string, value: any, silent?: boolean) {
    const oldValue = this.data[name];
    if (!isEqual(oldValue, value)) {
      this.data[name] = value;
      !silent && this.changeHandler?.({ ...this.data });
    }
  }

  setProperties(data: FormValues, silent?: boolean) {
    const newData = { ...this.data, ...data };
    if (isEqual(this.data, newData)) {
      this.data = newData;
      !silent && this.changeHandler?.({ ...this.data });
    }
  }

  onChange(handler: (data: FormValues) => any): this {
    this.changeHandler = handler;
    return this;
  }

  forEachProperty(callback: (key: string, value: any) => any) {
    keys(this.data).forEach((key) => callback(key, this.data[key]));
  }

  getDate():FormValues {
    return this.data;
  }
}

export const FormContext = React.createContext<FormHandler>(new FormHandler());

export function useFormContext(): FormHandler {
  const form = React.useContext(FormContext);
  if (!form) throw new Error("Form Context must be used within a Form");
  return form;
}

export function useFormValue<T = any>(
  name: string,
  value?: T
): [T | undefined, (value: T) => any] {
  const form = useFormContext();

  const setValue = <T>(value: T, silent?: boolean) => {
    form.setProperty(name, value, silent);
  };

  useEffect(() => setValue(value, true), [value]);

  return [value, setValue];
}

export function useFormValues(
  values: FormValues
): [FormValues | undefined, (values: FormValues) => any] {
  const form = useFormContext();

  const setValues = (values: FormValues, silent?: boolean) => {
    form.setProperties(values, silent);
  };

  useEffect(() => setValues(values, true), [values]);

  return [values, setValues];
}
