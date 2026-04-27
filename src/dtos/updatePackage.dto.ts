import { z } from "../config/zod.config";

export const updatePackageSchema = z.object({
    title: z.string().max(50).optional(),
    description: z.string().max(400).optional(),
    price: z.number().int().positive().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    availableSlots: z.number().int().nonnegative().optional(),
    maxSlots: z.number().int().positive().optional(),
    imageUrl: z.string().optional(),
    isActive: z.boolean().optional(),
})
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.startDate < data.endDate;
            }
            return true;
        },
        {
            message: "startDate must be before endDate",
            path: ["endDate"],
        }
    );

export type UpdatePackageDto = z.infer<typeof updatePackageSchema>;