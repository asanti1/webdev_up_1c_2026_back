import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().int().min(0),
  email: z.email(),
  password: z.string().min(6),
  cellphoneNumber: z.string().min(6),
  countryId: z.uuid(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;