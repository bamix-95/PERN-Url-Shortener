import { Response } from "express";
import { Env } from "../config/env.config";

export const sendAccessToken = (token: string, res: Response) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: Env.NODE_ENV === "production",
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
};
