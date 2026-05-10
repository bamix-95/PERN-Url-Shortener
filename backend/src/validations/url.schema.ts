import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "URL is required"),
  customSlug: z
    .string()
    .min(3, "Custom slug must be at least 3 characters")
    .max(20, "Custom slug must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug can only contain letters, numbers, hyphens and underscores",
    )
    .optional(),
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>;
