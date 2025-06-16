import { map } from "./object";

export const parseJsonObject = (
  value: any,
  transformer?: (obj: any) => any
) => {
  try {
    if (value) {
      const obj = JSON.parse(value);
      return transformer ? transformer(obj) : obj;
    }
  } catch (e) {}
};

export const parseJsonArray = (value: any, transformer?: (obj: any) => any) => {
  if (value) {
    try {
      const arr = JSON.parse(value);
      return transformer ? map(arr, transformer) : arr;
    } catch (e) {
      //console.log(value)
    }
  }
};

export const stringifyJson = (value: any) =>
  value ? JSON.stringify(value) : undefined;
