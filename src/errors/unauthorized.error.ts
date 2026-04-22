import { ErrorBase } from "./base.error";

export class UnauthorizedError extends ErrorBase {
  constructor(message = "Unauthorized", details?: unknown, options?: ErrorOptions) {
    super(message, 401, details, options);
  }
}