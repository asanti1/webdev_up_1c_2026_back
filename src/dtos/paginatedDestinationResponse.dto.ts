import z from "zod";
import { destinationResponseSchema } from "./destinationResponse.dto";

export const paginatedDestinationResponseSchema = z.object({
  data: z.array(destinationResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginatedDestinationResponseDto =
  z.infer<typeof paginatedDestinationResponseSchema>;