import { Message } from "../i18n/translator";
import { Nothing, Option, toOption } from "../fp";
import { reduce } from "./object";

export type ValidationFunction<T> = (
  validation: Validation<T>
) => Validation<T>;

export abstract class BaseField<T = any> {
  val: Option<T> = Nothing.get<T>();
  pipeline: ValidationFunction<T>[];
  constructor(readonly name: string, readonly label: string) {
    this.pipeline = [];
  }
  value(value: T | undefined | null): this {
    this.val = toOption<T>(value)
    return this;
  }
  required(required: boolean = true): this {
    required &&
      this.pipeline.push((validation: Validation<T>): Validation<T> => {
        return jointValidation(validation, validation.hasValue, {
          phrase: "required",
          data: { name: this.label },
        });
      });
    return this;
  }

  validate(): Validation<T> {
    return reduce(
      this.pipeline,
      (result: Validation<T>, func: ValidationFunction<T>): Validation<T> =>
        func(result),
      {
        name: this.name,
        value: this.val,
        errors: [],
        hasValue: this.val.isJust(),
        isValid: true,
      }
    );
  }
}

export interface Validation<T> {
  name: string;
  hasValue: boolean;
  value: Option<T>;
  isValid: boolean;
  errors: Message[];
}

export const jointValidation = <T>(
  validation: Validation<T>,
  valid: boolean,
  error: Message
): Validation<T> => {
  const errors = validation.errors || [];
  return {
    ...validation,
    isValid: validation.isValid && valid,
    errors: valid ? errors : [...errors, error],
  };
};
