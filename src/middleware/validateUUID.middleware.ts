import { NextFunction, Request, Response } from "express";
import { z } from "../config/zod.config";

const uuidSchema = z.uuid();

export const validateUUID = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = uuidSchema.safeParse(req.params.id);

    if (!result.success) {
        return res.status(400).json({
        message: "Invalid id format",
    });
    }

    return next();
};