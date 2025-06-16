export interface FieldState<T> {
  value: T | null;
  oldValue: T | null;
  isValid: boolean;
  errors: string[];
}

export interface FieldProps<T = any> {
  name: string;
  label?: string;
  aid?: string;
  readOnly?: boolean;
  value?: T;
  onChange?: (state: FieldState<T>) => any;
}

export const getValidState = <T>(value: T, oldValue: T): FieldState<T> => {
  return {
    isValid: true,
    errors: [],
    value,
    oldValue
  };
};

export const getInitialValidState = <T>(value: T): FieldState<T> =>  getValidState(value, value);

export const getErrorState = <T>(errors: string[], oldValue: T): FieldState<T> => {
  return {
    isValid: false,
    value: null,
    oldValue,
    errors,
  };
};