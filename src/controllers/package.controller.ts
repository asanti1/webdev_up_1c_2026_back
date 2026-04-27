import { NextFunction, Request, Response } from "express";
import { PackageService } from "../services/package.service";
import { updatePackageSchema } from "../dtos/updatePackage.dto";
import { createPackageSchema } from "../dtos/createPackage.dto";
import { z } from "../config/zod.config";

const paramsSchema = z.object({
  id: z.uuid()
});
export class PackageController {
  constructor(private readonly packageService: PackageService = new PackageService()) { }

  getById = async (req: Request, res: Response) => {
    const { id } = paramsSchema.parse(req.params)

    const user = await this.packageService.getById(id);

    return res.status(200).json(user);
  }

  get = async (req: Request, res: Response) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);

    if (Number.isNaN(limit) || limit <= 0) limit = 10;
    if (Number.isNaN(page) || page <= 0) page = 1;

    if (limit > 50) limit = 50;

    const result = await this.packageService.get(limit, page);

    return res.status(200).json(result);
  }

  updateById = async (req: Request, res: Response) => {
    const { id } = paramsSchema.parse(req.params)
    const dto = updatePackageSchema.parse(req.body);

    const pack = await this.packageService.update(id, dto);

    return res.status(200).json(pack);
  }


  deleteById = async (req: Request, res: Response) => {
    const { id } = paramsSchema.parse(req.params)

    await this.packageService.deleteById(id);

    return res.status(204).send();
  }


  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createPackageSchema.parse(req.body);

      const pkg = await this.packageService.create(data);

      res.status(201).json(pkg);
    } catch (error) {
      next(error);
    }
  };
}
