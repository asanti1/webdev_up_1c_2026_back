import { Request, Response } from "express";
import { z } from "../config/zod.config";
import { createCountrySchema } from "../dtos/createCountry.dto";
import { CountryService } from "../services/country.service";

const paramsSchema = z.object({
  id: z.uuid()
});

export class CountryController {
  constructor(private readonly countryService: CountryService = new CountryService()) { }

  get = async (req: Request, res: Response) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);

    if (Number.isNaN(limit) || limit <= 0) limit = 10;
    if (Number.isNaN(page) || page <= 0) page = 1;

    if (limit > 50) limit = 50;

    const result = await this.countryService.get(limit, page);

    return res.status(200).json(result);
  }

  getAll = async (req: Request, res: Response) => {
    const result = await this.countryService.getAll();

    return res.status(200).json(result);
  }

  getById = async (req: Request, res: Response) => {
    const { id } = paramsSchema.parse(req.params);

    const country = await this.countryService.getById(id);

    return res.status(200).json(country);
  }

  create = async (req: Request, res: Response) => {
    const data = createCountrySchema.parse(req.body);
    const country = await this.countryService.create(data);
    return res.status(201).json(country);
  };
}
