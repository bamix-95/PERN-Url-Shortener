import { Redis } from "ioredis";
import { logger } from "./logger";
import { Env } from "./env.config";

export const redis = new Redis(Env.REDIS_URL, {
  maxRetriesPerRequest: null, // required by BullMQ
  tls: {
    rejectUnauthorized: false,
  },
});

redis.on("connect", () => logger.info("Redis connected"));
redis.on("error", (err) => logger.error("Redis error", { err }));
