import z from "zod";
import { countryResponseSchema } from "./countryResponse.dto";

export const paginatedCountryResponseSchema = z.object({
  data: z.array(countryResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginatedCountryResponseDto =  z.infer<typeof paginatedCountryResponseSchema>;