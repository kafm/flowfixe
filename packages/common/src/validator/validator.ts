import { isEmpty } from "./object";
import { Either, Left, Right } from "../fp";
import { StringField, EmailField } from "./string";
import { BooleanField } from "./boolean";
import { DateField } from "./date";
import { IntegerField, NumberField } from "./number";
import { translator } from "../i18n";

export type Field =
  | StringField
  | EmailField
  | BooleanField
  | DateField
  | IntegerField
  | NumberField;

export class Validator<T> {
  constructor(readonly lang: string | null = null) {}
  validateObject(...fields: Field[]): Either<string[], T> {
    const validations = fields.map((field) => field.validate());
    const errors = validations
      .filter((validation) => !validation.isValid)
      .flatMap((validation) => validation.errors);
    if (isEmpty(errors)) {
      const res = {} as any;
      validations.forEach((validation) => {
        res[validation.name] = validation.value.caseOf(() => null, (val) => val);
      });
      return Right.of(res as T);
    }
    return Left.of(translator.translateMany(errors, this.lang));
  }

  validateField(field: Field): Either<string[], T> {
    const { errors, isValid, value } = field.validate();
    return isValid
      ? Right.of(value.caseOf(()=> null, (val) => val) as T)
      : Left.of(translator.translateMany(errors, this.lang));
  }
}

export const validateObject = <T = any>(
  ...fields: Field[]
): Either<string[], T> => new Validator<T>().validateObject(...fields);

export const validateField = <T = any>(field: Field, lang?: string | null): Either<string[], T> =>
  new Validator<T>(lang).validateField(field);
