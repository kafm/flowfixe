import { isNil, indexOf, isEmpty } from "./object";
import { toLower, trim } from "./string";
import { BaseField } from "./base";

export const isBoolean = (value: unknown): boolean => typeof value === 'boolean';

export const toBoolean = (value: any): boolean => {
  if (isBoolean(value) || isNil(value)) return value || false;
  const bool = toLower(trim(value));
  if (indexOf(["true", "false"], bool) !== -1) {
    return bool == "true";
  }
  return false;
};

export const anyToBoolean = (value: any): boolean => {
  const boolValue = toBoolean(value);
  return boolValue || !isEmpty(value)
};

export class BooleanField extends BaseField<boolean> {
  static of(name: string, label?: string): BooleanField {
    return new BooleanField(name, label || name);
  }

  value(value: any): this {
    super.value(toBoolean(value));
    return this;
  }
}
