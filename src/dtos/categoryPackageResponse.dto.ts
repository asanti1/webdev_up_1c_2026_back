import z from "zod";

export const categoryPackageResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  packages: z.array(
    z.object({
      id: z.uuid(),
      title: z.string(),
      price: z.number(),
    })
  ),
});

export type CategoryPackageResponseDto = z.infer<typeof categoryPackageResponseSchema>;