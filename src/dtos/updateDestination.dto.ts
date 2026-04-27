import { z } from "../config/zod.config";

export const updateDestinationSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  countryId: z.uuid().optional(),
});

export type UpdateDestinationDto = z.infer<typeof updateDestinationSchema>;