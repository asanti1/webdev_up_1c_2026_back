import { z } from "zod";

export const createPackageSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().int().min(0),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    maxSlots: z.coerce.number().min(1),
    imageUrl: z.string(),
    categoryPackageId: z.uuid(),
    destinationId: z.uuid(),
});



export type CreatePackageDto = z.infer<typeof createPackageSchema>;