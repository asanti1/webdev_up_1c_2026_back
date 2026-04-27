import z from "zod";

export const destinationResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  country: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  packages: z.array(
    z.object({
      id: z.uuid(),
      title: z.string(),
      price: z.number(),
    })
  ),
});

export type DestinationResponseDto = z.infer<typeof destinationResponseSchema>;