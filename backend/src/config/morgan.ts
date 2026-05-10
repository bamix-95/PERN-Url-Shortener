import morgan from "morgan";
import { logger } from "./logger";

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

export const morganMiddleware = morgan(
  process.env.NODE_ENV === "production" ? "combined" : "dev",
  { stream },
);
