import { z } from "../config/zod.config";

export const userResponseSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.email(),
  cellphoneNumber: z.string(),
  role: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  country: z.object({
    id: z.uuid(),
    name: z.string(),
    isoCode: z.string(),
  }),
});

export type UserResponseDto = z.infer<typeof userResponseSchema>;