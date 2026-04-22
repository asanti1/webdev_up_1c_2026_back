import { Request, Response } from "express";
import { z } from "zod";
import { updateUserSchema } from "../dtos/updateUser.dto";
import { UserService } from "../services/user.service";

const paramsSchema = z.object({
    id: z.uuid()
});
export class UserController {
    constructor(private readonly userService: UserService = new UserService()) { }



    async getById(req: Request, res: Response) {
        const { id } = paramsSchema.parse(req.params);

        const user = await this.userService.getById(id);

        return res.status(200).json(user);
    }

    async deleteById(req: Request, res: Response) {
        const { id } = paramsSchema.parse(req.params);

        const user = await this.userService.deleteById(id);

        return res.status(204).send();
    }

    async updateById(req: Request, res: Response) {
        const { id } = paramsSchema.parse(req.params);
        const dto = updateUserSchema.parse(req.body);

        const user = await this.userService.update(id, dto);

        return res.status(200).json(user);
    }
}
