import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};
