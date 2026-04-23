import { ErrorBase } from "./base.error";

export class ConflictError extends ErrorBase {
  constructor(message = "Conflict", details?: unknown, options?: ErrorOptions) {
    super(message, 409, details, options);
  }
}