import { z } from "../config/zod.config";

export const updateCategoryPackageSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export type UpdateCategoryPackageDto =
  z.infer<typeof updateCategoryPackageSchema>;