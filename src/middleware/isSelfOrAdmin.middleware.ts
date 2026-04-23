import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";

export const isSelfOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUser = req.user as User;
  const targetUserId = req.params.id;

  if (authUser.id === targetUserId || authUser.role?.name === "ADMIN") {
    return next();
  }

  return res.status(403).json({
    message: "Forbidden",
  });
};