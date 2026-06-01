import { z } from "../config/zod.config";
import { userResponseSchema } from "./userResponse.dto";

export const paginatedUserResponseSchema = z.object({
    data: z.array(userResponseSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});

export type PaginatedUserResponseDto =
    z.infer<typeof paginatedUserResponseSchema>;