import { isNil } from "./object";
import { replace } from "./string";
import { isNaN } from "./number";
import { BaseField, Validation, jointValidation } from "./base";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { systemToLibraryFormat } from "./dateFormatMapper";
dayjs.extend(relativeTime);

export const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

export const DEFAULT_DATETIME_FORMAT = DEFAULT_DATE_FORMAT + " HH:mm:ss";

export const toDate = (
  value: string | number | Date | null | undefined,
  format?: string
): Date | null => {
  if (isNil(value) || isNaN(value)) return null;
  if (value instanceof Date) return value;
  return dayjs(value, systemToLibraryFormat(format)).toDate();
};

export const formatDate = (
  value: string | number | Date | null | undefined,
  format: string = DEFAULT_DATETIME_FORMAT
): string | null =>
  !isNil(value) ? dayjs(value).format(systemToLibraryFormat(format)) : null;

export const isDate = (value: any): boolean => dayjs(value).isValid();

export const getNow = (): Date => dayjs().toDate();

export const getCurrentYear = () => getNow().getFullYear();

export const getCurrentMonth = () => getNow().getMonth()

export const getCurrentDay = () => getNow().getDay()

export const fromNow = (date: Date): string => dayjs(date).fromNow();

export const dateDiff = (
  date: Date | null,
  other: Date | null,
  interval?: any
): number => {
  if (!date && !other) return dayjs(date).diff(other, interval);
  return 0;
};

export const isDatesEqual = (date: Date | null, another: Date | null) =>
  dayjs(date).isSame(another);

export const toDateString = (
  date: Date | null | string | undefined
): string | undefined => (isDate(date) ? date?.toString() : (date as string));

export class DateField extends BaseField<Date> {
  static of(name: string, label?: string): DateField {
    return new DateField(name, label || name);
  }

  value(value: any): this {
    super.value(
      isNil(value) || value instanceof Date
        ? value
        : new Date(replace(value, /-/g, "/"))
    );
    return this;
  }

  min(value: Date | null): this {
    !isNil(value) &&
      this.pipeline.push((validation: Validation<Date>): Validation<Date> => {
        return jointValidation(
          validation,
          validation.value.caseOf(
            () => true,
            (val) => val >= value!
          ),
          {
            phrase: "mindate",
            data: { name: this.label, min: value },
          }
        );
      });
    return this;
  }

  max(value: Date | null): this {
    !isNil(value) &&
      this.pipeline.push((validation: Validation<Date>): Validation<Date> => {
        return jointValidation(
          validation,
          validation.value.caseOf(
            () => true,
            (val) => val <= value!
          ),
          {
            phrase: "maxdate",
            data: { name: this.label, max: value },
          }
        );
      });
    return this;
  }
}
