import { NextFunction, Request, Response } from "express";
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