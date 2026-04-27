import { z } from "zod";

export const createCountrySchema = z.object({
    name: z.string().min(2).max(50),
    isoCode: z.string().length(3).toUpperCase(),
});

export type CreateCountryDto = z.infer<typeof createCountrySchema>;