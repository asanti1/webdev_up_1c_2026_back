import { z } from "zod";


export const packageResponseSchema = z.object({
    id: z.uuid(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    availableSlots: z.number(),
    maxSlots: z.number(),
    isActive: z.boolean(),
    imageUrl: z.string(),
    categoryPackage: z.object({
        id: z.uuid(),
        name: z.string(),
    }),
    destination: z.object({
        id: z.uuid(),
        name: z.string()
    })
});

export type FindByIdPackageSchema = z.infer<typeof packageResponseSchema>;