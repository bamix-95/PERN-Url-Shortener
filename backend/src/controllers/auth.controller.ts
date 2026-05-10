import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginSchema, registerSchema } from "../validations/auth.schema";
import {
  forgotPasswordService,
  getMeService,
  loginService,
  registerService,
  resendVerificationEmailService,
  resetPasswordService,
  verifyEmailService,
} from "../services/auth.service";
import { Env } from "../config/env.config";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const parsedResult = registerSchema.safeParse(req.body);

  if (!parsedResult.success) {
    res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: parsedResult.error.issues.map((i) => ({
        path: i.path,
        message: i.message,
      })),
    });
    return;
  }

  const { user } = await registerService(parsedResult.data);

  res.status(201).json({
    success: true,
    message:
      "Registration successful. Please check your email to verify your account.",
    user: { id: user.id, email: user.email, name: user.name },
  });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query as { token: string };

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Verification token is required",
    });
    return;
  }

  await verifyEmailService(token);

  res.status(200).json({
    success: true,
    message: "Email verified successfully. You can now log in.",
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsedResult = loginSchema.safeParse(req.body);

  if (!parsedResult.success) {
    res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: parsedResult.error.issues.map((i) => ({
        path: i.path,
        message: i.message,
      })),
    });
    return;
  }

  const { token, user } = await loginService(parsedResult.data);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: Env.NODE_ENV === "production",
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: Env.NODE_ENV === "production",
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const { user } = await getMeService(req.user!.userId);

  res.status(200).json({
    success: true,
    user,
  });
});

export const resendVerificationEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    await resendVerificationEmailService(email);

    res.status(200).json({
      success: true,
      message: "If that email exists, a verification link has been sent.",
    });
  },
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    await forgotPasswordService(email);

    res.status(200).json({
      success: true,
      message: "If that email exists, a password reset link has been sent.",
    });
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.query as { token: string };
    const { password } = req.body as { password: string };

    if (!token || !password) {
      res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
      return;
    }

    await resetPasswordService(token, password);

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  },
);
