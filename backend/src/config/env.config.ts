import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().default("5000").transform(Number),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  BASE_URL: z.string().url(),
  CLIENT_URL: z.string().url(),

  DATABASE_URL: z.string().url(),

  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRES: z.string().default("1d"),

  RESEND_API_KEY: z.string().min(1),

  REDIS_URL: z.string().min(1),

  TEST_EMAIL: z.string().email(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const Env = parsed.data;
