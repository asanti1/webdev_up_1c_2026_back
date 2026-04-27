import z from "zod";

export const countryResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  isoCode: z.string()
});

export type CountryResponseDto = z.infer<typeof countryResponseSchema>;