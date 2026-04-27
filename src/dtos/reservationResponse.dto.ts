import { z } from "zod";
import { ReservationStatusEnum } from "../entity/reservation.entity";





export const reservationResponseSchema = z.object({
    id: z.uuid(),
    reservationDate: z.coerce.date(),
    totalPassengers: z.number(),
    finalPrice: z.coerce.number(),
    notes: z.string().nullable(),
    status: z.enum(ReservationStatusEnum),
    destination: z.object({
        id: z.uuid(),
        name: z.string(),
    }),
    package: z.object({
        id: z.uuid(),
        title: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date()

    }),
    user: z.object({
        id: z.uuid(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.email(),
    })
});

export const paginatedReservationsResponseSchema = z.object({
    data: z.array(reservationResponseSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});

export type ReservationResponseDto = z.infer<typeof reservationResponseSchema>;
export type PaginatedReservationsResponseDto = z.infer<typeof paginatedReservationsResponseSchema>;