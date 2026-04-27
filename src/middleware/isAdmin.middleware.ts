import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUser = req.user as User;

  if (authUser.role.name === "ADMIN") {
    return next();
  }

  return res.status(403).json({
    message: "Admin privileges required",
  });
};