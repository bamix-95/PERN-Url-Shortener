import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Env } from "../config/env.config";
import type { JwtPayload } from "../types/auth.types";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashed: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, Env.ACCESS_TOKEN_SECRET, {
    expiresIn: Env.ACCESS_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, Env.ACCESS_TOKEN_SECRET) as JwtPayload;
};
