// src/config/logger.ts

import winston from "winston";
import { Env } from "./env.config";

const { combine, timestamp, colorize, printf, json } = winston.format;

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
  return `${timestamp} [${level}]: ${message} ${metaStr}`;
});

export const logger = winston.createLogger({
  level: Env.NODE_ENV === "production" ? "warn" : "debug",
  format:
    Env.NODE_ENV === "production"
      ? combine(timestamp(), json())
      : combine(
          colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          devFormat,
        ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
