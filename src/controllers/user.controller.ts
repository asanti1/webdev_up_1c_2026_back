import { NextFunction, Request, Response } from "express";
import { z } from "../config/zod.config";
import { updateUserSchema } from "../dtos/updateUser.dto";
import { UserService } from "../services/user.service";
import { createUserSchema } from "../dtos/createUser.dto";

const paramsSchema = z.object({
  id: z.uuid()
});
export class UserController {
  constructor(private readonly userService: UserService = new UserService()) { }


  get = async (req: Request, res: Response) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);

    if (Number.isNaN(limit) || limit <= 0) limit = 10;
    if (Number.isNaN(page) || page <= 0) page = 1;

    if (limit > 50) limit = 50;

    const result = await this.userService.get(limit, page);

    return res.status(200).json(result);
  }

  getById = async (req: Request, res: Response) => {
    const { id } = paramsSchema.parse(req.params);

    const user = await this.userService.getById(id);

    return res.status(200).json(user);
  }

  deleteById = async (req: Request, res: Response) => {
    const { id } = paramsSchema.parse(req.params);

    await this.userService.deleteById(id);

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

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
}
