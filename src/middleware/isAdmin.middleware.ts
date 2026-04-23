import { NextFunction, Request, Response } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUser = req.user as { id: string; role?: string };

  if (authUser.role === "ADMIN") {
    return next();
  }

  return res.status(403).json({
    message: "Forbidden",
  });
};