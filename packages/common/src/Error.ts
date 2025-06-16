export type Errors = {
  message: string;
  errors: string[];
};

export const getErrorMessage = (e: unknown): string => {
  if (!e) return "";
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  const error = e as any;
  return  error.message || error.error;
};

export const getErrorsObject = (e: unknown): Errors => {
  const message = getErrorMessage(e);
  const errors = (e as any)?.errors || [];
  return { message, errors };
};
