import { z } from "../config/zod.config";

export const createCountrySchema = z.object({
    name: z.string().min(2).max(50),
    isoCode: z.string().length(3).toUpperCase(),
});

export type CreateCountryDto = z.infer<typeof createCountrySchema>;