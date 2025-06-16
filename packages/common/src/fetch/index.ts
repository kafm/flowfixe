import { parseJsonObject } from "../validator";
import { isHttpError, getHttpError } from "./Errors";

export * from "./Errors";

const errorToResponse = async (response: Response) => {
  const body = await response.text();
  const jsonBody = parseJsonObject(body) as any;
  if (jsonBody)
    return {
      message: jsonBody.message || jsonBody.error,
      errors: jsonBody.errors || jsonBody.validationErrors,
    };
  return { message: body || response.statusText };
};

export async function prettyFetch(
  input: RequestInfo,
  init?: RequestInit,
  parseError: boolean = false
): Promise<Response> {
  const response = await fetch(input, init);
  if (isHttpError(response.status)) {
    let errorObject = parseError
      ? await errorToResponse(response)
      : { message: response.statusText };
    throw getHttpError(response.status, errorObject);
  }
  return response;
}
