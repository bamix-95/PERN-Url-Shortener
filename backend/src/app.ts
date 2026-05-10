import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { Env } from "./config/env.config";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { morganMiddleware } from "./config/morgan";
import authRoutes from "./routes/auth.route";
import urlRoutes from "./routes/url.route";
import redirectRoutes from "./routes/redirect.route";

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: Env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(morganMiddleware);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/", redirectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
