import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorBase } from "../errors/base.error";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (err instanceof ErrorBase) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        name: err.name,
        message: err.message,
        details: err.details ?? null,
      },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        name: "ValidationError",
        message: "Validation error",
        details: err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  type DatabaseError = {
    code?: string;
    detail?: string;
  };

  const dbError = err as DatabaseError;

  if (dbError.code === "23505") {
    return res.status(409).json({
      success: false,
      error: {
        name: "ConflictError",
        message: "Resource already exists",
        details: dbError.detail ?? null,
      },
    });
  }

  console.error("Unhandled error:", err);

  return res.status(500).json({
    success: false,
    error: {
      name: "InternalServerError",
      message: "Internal server error",
      details: null,
    },
  });
}