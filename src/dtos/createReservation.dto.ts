import { z } from "zod";


export const createReservationSchema = z.object({
    packageId: z.uuid(),
    totalPassengers: z.coerce.number().int().min(1),
    notes: z.string().max(400).optional().nullable(),
});

export type CreateReservationDto = z.infer<typeof createReservationSchema>;
