export const isHttpError = (statusCode: number) => statusCode >= 400;

export const getHttpError = (
  statusCode: number,
  error?: {
    message: string;
    errors?: string[];
  }
): HttpError => {
  switch (statusCode) {
    case 400:
      return new BadRequestError(error?.message, error?.errors);
    case 401:
      return new UnauthorizedError(error?.message);
    case 402:
      return new PaymentRequiredError(error?.message);
    case 403:
      return new ForbiddenError(error?.message);
    case 404:
      return new NotFoundError(error?.message);
    case 405:
      return new MethodNotAllowedError(error?.message);
    case 406:
      return new NotAcceptableError(error?.message);
    case 407:
      return new ProxyAuthenticationRequiredError(error?.message);
    case 408:
      return new RequestTimeoutError(error?.message);
    case 409:
      return new ConflictError(error?.message);
    case 410:
      return new GoneError(error?.message);
    case 411:
      return new LengthRequiredError(error?.message);
    case 412:
      return new PreconditionFailedError(error?.message);
    case 413:
      return new PayloadTooLargeError(error?.message);
    case 414:
      return new URITooLongError(error?.message);
    case 415:
      return new UnsupportedMediaTypeError(error?.message);
    case 416:
      return new RangeNotSatisfiableError(error?.message);
    case 417:
      return new ExpectationFailedError(error?.message);
    case 418:
      return new ImATeapotError(error?.message);
    case 421:
      return new MisdirectedRequestError(error?.message);
    case 422:
      return new UnprocessableEntityError(error?.message);
    case 423:
      return new LockedError(error?.message);
    case 424:
      return new FailedDependencyError(error?.message);
    case 425:
      return new TooEarlyError(error?.message);
    case 426:
      return new UpgradeRequiredError(error?.message);
    case 428:
      return new PreconditionRequiredError(error?.message);
    case 429:
      return new TooManyRequestsError(error?.message);
    case 431:
      return new RequestHeaderFieldsTooLargeError(error?.message);
    case 451:
      return new UnavailableForLegalReasonsError(error?.message);
    case 500:
      return new InternalServerError(error?.message);
    case 501:
      return new NotImplementedError(error?.message);
    case 502:
      return new BadGatewayError(error?.message);
    case 503:
      return new ServiceUnavailableError(error?.message);
    case 504:
      return new GatewayTimeoutError(error?.message);
    case 505:
      return new HTTPVersionNotSupportedError(error?.message);
    case 506:
      return new VariantAlsoNegotiatesError(error?.message);
    case 507:
      return new InsufficientStorageError(error?.message);
    case 508:
      return new LoopDetectedError(error?.message);
    case 510:
      return new NotExtendedError(error?.message);
    case 511:
      return new NetworkAuthenticationRequiredError(error?.message);
    default:
      return new HttpError(statusCode, error?.message || "Unknown Error");
  }
};

export class HttpError extends Error {
  constructor(readonly status: number, readonly error: string) {
    super(error);
    this.name = this.constructor.name;
    //Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(
    message: string = "Bad Request",
    readonly errors?: string[]
  ) {
    super(400, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}

export class PaymentRequiredError extends HttpError {
  constructor(message: string = "Payment Required") {
    super(402, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Not Found") {
    super(404, message);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message: string = "Method Not Allowed") {
    super(405, message);
  }
}

export class NotAcceptableError extends HttpError {
  constructor(message: string = "Not Acceptable") {
    super(406, message);
  }
}

export class ProxyAuthenticationRequiredError extends HttpError {
  constructor(message: string = "Proxy Authentication Required") {
    super(407, message);
  }
}

export class RequestTimeoutError extends HttpError {
  constructor(message: string = "Request Timeout") {
    super(408, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Conflict") {
    super(409, message);
  }
}

export class GoneError extends HttpError {
  constructor(message: string = "Gone") {
    super(410, message);
  }
}

export class LengthRequiredError extends HttpError {
  constructor(message: string = "Length Required") {
    super(411, message);
  }
}

export class PreconditionFailedError extends HttpError {
  constructor(message: string = "Precondition Failed") {
    super(412, message);
  }
}

export class PayloadTooLargeError extends HttpError {
  constructor(message: string = "Payload Too Large") {
    super(413, message);
  }
}

export class URITooLongError extends HttpError {
  constructor(message: string = "URI Too Long") {
    super(414, message);
  }
}

export class UnsupportedMediaTypeError extends HttpError {
  constructor(message: string = "Unsupported Media Type") {
    super(415, message);
  }
}

export class RangeNotSatisfiableError extends HttpError {
  constructor(message: string = "Range Not Satisfiable") {
    super(416, message);
  }
}

export class ExpectationFailedError extends HttpError {
  constructor(message: string = "Expectation Failed") {
    super(417, message);
  }
}

export class ImATeapotError extends HttpError {
  constructor(message: string = "I'm a teapot") {
    super(418, message);
  }
}

export class MisdirectedRequestError extends HttpError {
  constructor(message: string = "Misdirected Request") {
    super(421, message);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string = "Unprocessable Entity") {
    super(422, message);
  }
}

export class LockedError extends HttpError {
  constructor(message: string = "Locked") {
    super(423, message);
  }
}

export class FailedDependencyError extends HttpError {
  constructor(message: string = "Failed Dependency") {
    super(424, message);
  }
}

export class TooEarlyError extends HttpError {
  constructor(message: string = "Too Early") {
    super(425, message);
  }
}

export class UpgradeRequiredError extends HttpError {
  constructor(message: string = "Upgrade Required") {
    super(426, message);
  }
}

export class PreconditionRequiredError extends HttpError {
  constructor(message: string = "Precondition Required") {
    super(428, message);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message: string = "Too Many Requests") {
    super(429, message);
  }
}

export class RequestHeaderFieldsTooLargeError extends HttpError {
  constructor(message: string = "Request Header Fields Too Large") {
    super(431, message);
  }
}

export class UnavailableForLegalReasonsError extends HttpError {
  constructor(message: string = "Unavailable For Legal Reasons") {
    super(451, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error") {
    super(500, message);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message: string = "Not Implemented") {
    super(501, message);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message: string = "Bad Gateway") {
    super(502, message);
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message: string = "Service Unavailable") {
    super(503, message);
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor(message: string = "Gateway Timeout") {
    super(504, message);
  }
}

export class HTTPVersionNotSupportedError extends HttpError {
  constructor(message: string = "HTTP Version Not Supported") {
    super(505, message);
  }
}

export class VariantAlsoNegotiatesError extends HttpError {
  constructor(message: string = "Variant Also Negotiates") {
    super(506, message);
  }
}

export class InsufficientStorageError extends HttpError {
  constructor(message: string = "Insufficient Storage") {
    super(507, message);
  }
}

export class LoopDetectedError extends HttpError {
  constructor(message: string = "Loop Detected") {
    super(508, message);
  }
}

export class NotExtendedError extends HttpError {
  constructor(message: string = "Not Extended") {
    super(510, message);
  }
}

export class NetworkAuthenticationRequiredError extends HttpError {
  constructor(message: string = "Network Authentication Required") {
    super(511, message);
  }
}
