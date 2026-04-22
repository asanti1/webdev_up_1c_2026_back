import { ErrorBase } from "./base.error";

export class NotFoundError extends ErrorBase {
  constructor(message = "Resource not found", details?: unknown, options?: ErrorOptions) {
    super(message, 404, details, options);
  }
}