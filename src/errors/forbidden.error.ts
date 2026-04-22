import { ErrorBase } from "./base.error";


export class ForbiddenError extends ErrorBase {
  constructor(message = "Forbidden", details?: unknown, options?: ErrorOptions) {
    super(message, 403, details, options);
  }
}