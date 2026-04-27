import { z } from "../config/zod.config";
import { categoryPackageResponseSchema } from "./categoryPackageResponse.dto";

export const paginatedCategoryPackageResponseSchema = z.object({
  data: z.array(categoryPackageResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginatedCategoryPackageResponseDto =  z.infer<typeof paginatedCategoryPackageResponseSchema>;