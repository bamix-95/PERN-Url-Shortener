import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth.utils";
import { AppError } from "../utils/appError";

const extractToken = (req: Request): string | null => {
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }
  return null;
};

export const protect = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const token = extractToken(req);

  if (!token) {
    return next(new AppError("Not authorized, no token", 401));
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError("Not authorized, invalid token", 401));
  }
};

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const token = extractToken(req);

  if (!token) {
    return next();
  }

  try {
    req.user = verifyAccessToken(token);
  } catch {}

  next();
};
