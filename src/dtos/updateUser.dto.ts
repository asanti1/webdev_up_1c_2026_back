import { z } from "zod";


export const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  age: z.number().int().min(0).optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
  cellphoneNumber: z.string().min(6).optional(),
  countryId: z.uuid().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;