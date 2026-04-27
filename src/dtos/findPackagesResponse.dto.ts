import { z } from "zod";
import { packageResponseSchema } from "./packageResponse.dto";


export const findAllPackageSchema = z.object({
  data: z.array(packageResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),

});


export type PaginatedPackagesResponseDto = z.infer<typeof findAllPackageSchema>