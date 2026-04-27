import { Request, Response } from "express";
import { z } from "../config/zod.config";
import { createDestinationSchema } from "../dtos/createDestination.dto";
import { updateDestinationSchema } from "../dtos/updateDestination.dto";
import { DestinationService } from "../services/destination.service";

const paramsSchema = z.object({
    id: z.uuid()
});

export class DestinationController {
    constructor(private readonly destinationService: DestinationService = new DestinationService()) { }



    get = async (req: Request, res: Response) => {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);

        if (Number.isNaN(limit) || limit <= 0) limit = 10;
        if (Number.isNaN(page) || page <= 0) page = 1;

        if (limit > 50) limit = 50;

        const result = await this.destinationService.get(limit, page);

        return res.status(200).json(result);
    }

    getById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);

        const destination = await this.destinationService.getById(id);

        return res.status(200).json(destination);
    }

    updateById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params)
        const dto = updateDestinationSchema.parse(req.body);

        const dest = await this.destinationService.update(id, dto);

        return res.status(200).json(dest);
    }


    deleteById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params)

        await this.destinationService.deleteById(id);

        return res.status(204).send();
    }


    create = async (req: Request, res: Response) => {
        const data = createDestinationSchema.parse(req.body);
        const dest = await this.destinationService.create(data);
        return res.status(201).json(dest);
    };
}
