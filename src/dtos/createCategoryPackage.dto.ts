import { z } from "../config/zod.config";

export const createCategoryPackageSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type CreateCategoryPackageDto = z.infer<typeof createCategoryPackageSchema>;