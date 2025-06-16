import { isNil } from "./object";
import accounting from "accounting";
import { BaseField, Validation, jointValidation } from "./base";

export const isNaN = (value: unknown): boolean => Number.isNaN(value);

export const isNumber = (value: unknown): boolean => isNumber(value);

export const toNumber = (value: unknown): number | null => {
  if (isNil(value)) return null;
  if (typeof value === "number") return value;

  if (typeof value === "symbol") return NaN;

  if (typeof value === "bigint") return Number(value);

  if (typeof value === "boolean") return value ? 1 : 0;

  const str = typeof value === "string" ? value.trim() : String(value).trim();

  if (str === "") return 0;

  const num = Number(str);

  return isNaN(num) ? NaN : num;
};

export const toInteger = (value: unknown): number | null => {
  const num = toNumber(value);
  if (num == null) return null;
  if (isNaN(num)) return 0;
  if (num === 0 || !isFinite(num!)) return num;
  return num < 0 ? Math.floor(num) : Math.floor(num);
};

export const inRange = (
  value: number,
  start: number,
  end?: number
): boolean => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return value >= Math.min(start, end) && value < Math.max(start, end);
};

export const range = (start: number, end?: number, step = 1): number[] => {
  const output: number[] = [];
  if (end === undefined) {
    end = start;
    start = 0;
  }
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    output.push(i);
  }
  return output;
};

export class NumberField extends BaseField<number> {
  static of(name: string, label?: string): NumberField {
    return new NumberField(name, label || name);
  }

  value(value: any): this {
    super.value(toNumber(value));
    return this;
  }

  min(value?: number | null): this {
    !isNil(value) &&
      this.pipeline.push(
        (validation: Validation<number>): Validation<number> => {
          return jointValidation(
            validation,
            validation.value.caseOf(
              () => true,
              (val) => val >= value!
            ),
            {
              phrase: "minvalue",
              data: { name: this.label, min: value },
            }
          );
        }
      );
    return this;
  }

  max(value?: number | null): this {
    !isNil(value) &&
      this.pipeline.push(
        (validation: Validation<number>): Validation<number> => {
          return jointValidation(
            validation,
            validation.value.caseOf(
              () => true,
              (val) => val <= value!
            ),
            {
              phrase: "maxvalue",
              data: { name: this.label, max: value },
            }
          );
        }
      );
    return this;
  }
}

export class IntegerField extends NumberField {
  value(value: any): this {
    super.value(toInteger(value));
    return this;
  }
}

export class NumberFormatter {
  thousandsSeparator: string = "";
  decimalSeparator: string = ".";
  decimalNumDigits: number = 2;
  prefix: string = "";
  suffix: string = "";
  integer: boolean = false;

  format(value: number): string {
    const numberStr = accounting.formatNumber(
      value,
      this.integer ? 0 : this.decimalNumDigits,
      this.thousandsSeparator,
      this.decimalSeparator
    );
    return this.prefix + numberStr + this.suffix;
  }

  asInteger(integer: boolean = true): this {
    this.integer = integer;
    return this;
  }

  withThousandsSeparator(thousandsSeparator: string): this {
    this.thousandsSeparator = thousandsSeparator;
    return this;
  }

  withDecimalSeparator(decimalSeparator: string): this {
    this.decimalSeparator = decimalSeparator;
    return this;
  }

  withDecimalNumDigits(decimalNumDigits: number): this {
    this.decimalNumDigits = decimalNumDigits;
    return this;
  }

  withPrefix(prefix: string): this {
    this.prefix = prefix;
    return this;
  }

  withSuffix(suffix: string): this {
    this.suffix = suffix;
    return this;
  }
}
