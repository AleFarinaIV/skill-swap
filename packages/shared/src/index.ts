import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("skill-swap-api"),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
