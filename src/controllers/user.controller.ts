import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { updateUserSchema } from "../dtos/updateUser.dto";
import { UserService } from "../services/user.service";
import { createUserSchema } from "../dtos/createUser.dto";

const paramsSchema = z.object({
    id: z.uuid()
});
export class UserController {
    constructor(private readonly userService: UserService = new UserService()) { }

    getById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);

        const user = await this.userService.getById(id);

        return res.status(200).json(user);
    }

    deleteById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);

        const user = await this.userService.deleteById(id);

        return res.status(204).send();
    }

    updateById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);
        const dto = updateUserSchema.parse(req.body);

        const user = await this.userService.update(id, dto);

        return res.status(200).json(user);
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createUserSchema.parse(req.body);

      const user = await this.userService.create(data);

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
  };
}
