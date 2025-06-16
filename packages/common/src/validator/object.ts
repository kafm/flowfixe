
export const isNil = (value: unknown): boolean => value == null;

export const reduce = <T, R>(
  array: T[],
  callback: (acc: R, val: T, index: number, arr: T[]) => R,
  initial: R
): R => array.reduce(callback, initial);

export const map = <T, R>(array: T[], fn: (val: T, index: number, arr: T[]) => R): R[] =>
  array.map(fn);

export const filter = <T>(array: T[], predicate: (val: T, index: number, arr: T[]) => boolean): T[] =>
  array.filter(predicate);

export const indexOf = <T>(array: T[], value: T): number =>
  array.indexOf(value);

export const slice = <T>(array: T[], start?: number, end?: number): T[] =>
  array.slice(start, end);

export const concat = <T>(...arrays: T[][]): T[] =>
  ([] as T[]).concat(...arrays);

export const uniq = <T>(array: T[]): T[] =>
  Array.from(new Set(array));

export const keys = (obj: object): string[] =>
  Object.keys(obj);

export const extend = <T extends object, U extends object>(target: T, ...sources: U[]): T & U =>
  Object.assign(target, ...sources);

export const defaultTo = <T>(value: T | null | undefined, defaultValue: T): T =>
  value == null || (typeof value === 'number' && isNaN(value)) ? defaultValue : value;

export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function';

export const isArray = Array.isArray;

export function includes<T>(collection: T[] | string, value: T | string, fromIndex = 0): boolean {
  return collection.includes(value as any, fromIndex);
}

export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b || a == null || b == null) return false;

  if (typeof a !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const aKeys = Object.keys(a as object);
  const bKeys = Object.keys(b as object);
  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!(key in (b as object))) return false;
    if (!isEqual((a as any)[key], (b as any)[key])) return false;
  }

  return true;
}
