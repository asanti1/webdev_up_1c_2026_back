import { Request, Response } from "express";
import { z } from "../config/zod.config";
import { ReservationStatusEnum } from "../entity/reservation.entity";
import { BadRequestError } from "../errors/badRequest.error";
import { ReservationService } from "../services/reservation.service";
import { User } from "../entity/user.entity";
import { createReservationSchema } from "../dtos/createReservation.dto";

const querySchema = z.object({
    status: z.enum(ReservationStatusEnum).optional(),
});

const paramsSchema = z.object({
    id: z.uuid()
});

export class ReservationController {
    constructor(private readonly reservationService: ReservationService = new ReservationService()) { }

    get = async (req: Request, res: Response) => {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);
        const { status } = querySchema.parse(req.query);

        if (Number.isNaN(limit) || limit <= 0) limit = 10;
        if (Number.isNaN(page) || page <= 0) page = 1;

        if (limit > 50) limit = 50;

        const result = await this.reservationService.get(limit, page, status);

        return res.status(200).json(result);
    }

    getAllMe = async (req: Request, res: Response) => {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);
        const user = req.user! as User;

        if (Number.isNaN(limit) || limit <= 0) limit = 10;
        if (Number.isNaN(page) || page <= 0) page = 1;

        if (limit > 50) limit = 50;

        const result = await this.reservationService.getAllByUserId(limit, page, user.id);

        return res.status(200).json(result);
    }


    getById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);

        const result = await this.reservationService.getById(id);

        return res.status(200).json(result);
    }

    changeStatusById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params);
        const { status } = querySchema.parse(req.query);

        if (!status) throw new BadRequestError("Status is required");

        const user = await this.reservationService.update(id, status);

        return res.status(200).json(user);
    }

    deleteById = async (req: Request, res: Response) => {
        const { id } = paramsSchema.parse(req.params)
        const user = req.user! as User;

        await this.reservationService.deleteById(id, user.id, user.role.name);

        return res.status(204).send();
    }

    create = async (req: Request, res: Response) => {
        const dto = createReservationSchema.parse(req.body);
        const user = req.user! as User;

        const reservation = await this.reservationService.create(dto, user.id);

        return res.status(201).json(reservation);
    }

}