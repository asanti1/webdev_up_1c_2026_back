import { NextFunction, Request, Response } from "express";
import { createUserSchema } from "../dtos/createUser.dto";
import { loginSchema } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
    constructor(private readonly authService: AuthService = new AuthService()) { }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("test");

            const data = loginSchema.parse(req.body);
            const result = await this.authService.login(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createUserSchema.parse(req.body);

            const user = await this.authService.register(data);
            const safeUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role?.name,
            };

            res.status(201).json(safeUser);
        } catch (error) {
            next(error);
        }
    }
}