import { Request, Response } from "express";
import z from "zod";
import { CategoryPackageService } from "../services/categoryPackage.service";
import { updateCategoryPackageSchema } from "../dtos/updateCategoryPackage.dto";
import { createCategoryPackageSchema } from "../dtos/createCategoryPackage.dto";

const paramsSchema = z.object({
    id: z.uuid()
});

export class CategoryPackageController {
    constructor(private readonly categoryPackageService: CategoryPackageService = new CategoryPackageService()) { }
    get = async (req: Request, res: Response) => {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);

        if (Number.isNaN(limit) || limit <= 0) limit = 10;
        if (Number.isNaN(page) || page <= 0) page = 1;

        if (limit > 50) limit = 50;

        const result = await this.categoryPackageService.get(limit, page);

        return res.status(200).json(result);
    }

    getById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);

        const categoryPackage = await this.categoryPackageService.getById(id);

        return res.status(200).json(categoryPackage);
    }

    updateById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);
        const dto = updateCategoryPackageSchema.parse(req.body);

        const categoryPackage = await this.categoryPackageService.update(id, dto);

        return res.status(200).json(categoryPackage);
    }


    deleteById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);

        await this.categoryPackageService.deleteById(id);

        return res.status(204).send();
    }


    create = async (req: Request, res: Response) => {
        const data = createCategoryPackageSchema.parse(req.body);
        const categoryPackage = await this.categoryPackageService.create(data);
        return res.status(201).json(categoryPackage);
    };
}
