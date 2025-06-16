import { isNil } from "./object";
import { BaseField, Validation, jointValidation } from "./base";
import { Message } from "../i18n/translator";

export const isString = (value: unknown): boolean => 
    typeof value === 'string' || value instanceof String;

export const toString = (value: unknown): string => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'symbol') return value.toString();
  if (typeof value === 'function') return value.toString();
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return Object.prototype.toString.call(value);
    }
  }
  return String(value);
}

export const toLower = (value: unknown): string =>
  String(value).toLowerCase();

export const trim = (value: unknown): string =>
  String(value).trim();

export const replace = (value: unknown, pattern: string | RegExp, replacement: string): string =>
  String(value).replace(pattern, replacement);

export const toRegex = (regexStr?: string, flag?: string): RegExp | null =>
  regexStr ? new RegExp(regexStr, flag) : null;

export class StringField extends BaseField<string> {
  static of(name: string, label?: string): StringField {
    return new StringField(name, label || name);
  }

  value(value: any): this {
    super.value(toString(value));
    return this;
  }

  minLength(length: number | null): this {
    !isNil(length) &&
      this.pipeline.push(
        (validation: Validation<string>): Validation<string> => {
          return jointValidation(
            validation,
            validation.value.caseOf(
              () => true,
              (val) => val.length >= length!
            ),
            {
              phrase: "minlength",
              data: { name: this.label, min: length },
            }
          );
        }
      );
    return this;
  }

  maxLength(length: number | null): this {
    !isNil(length) &&
      this.pipeline.push(
        (validation: Validation<string>): Validation<string> => {
          return jointValidation(
            validation,
            validation.value.caseOf(
              () => true,
              (val) => val.length <= length!
            ),
            {
              phrase: "maxlength",
              data: { name: this.label, max: length },
            }
          );
        }
      );
    return this;
  }

  match(regex: RegExp | null, errorMessage?: Message): this {
    regex &&
      this.pipeline.push(
        (validation: Validation<string>): Validation<string> => {
          return jointValidation(
            validation,
            validation.value.caseOf(
              () => true,
              (val) => regex.test(val)
            ),
            errorMessage || {
              phrase: "regex",
              data: { name: this.label },
            }
          );
        }
      );
    return this;
  }
}

export class EmailField extends StringField {
  static of(name: string, label?: string): StringField {
    const field = new StringField(name, label || name);
    return field.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      phrase: "email",
      data: { name: field.label },
    });
  }
}
