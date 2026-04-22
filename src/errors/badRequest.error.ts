import { ErrorBase } from "./base.error";

export class BadRequestError extends ErrorBase {
  constructor(message = "Bad request", details?: unknown, options?: ErrorOptions) {
    super(message, 400, details, options);
  }
}