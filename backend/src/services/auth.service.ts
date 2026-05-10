import crypto from "crypto";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../database";
import { users } from "../database/schema";
import { AppError } from "../utils/appError";
import {
  comparePassword,
  hashPassword,
  signAccessToken,
} from "../utils/auth.utils";
import type { LoginInput, RegisterInput } from "../validations/auth.schema";
import { Env } from "../config/env.config";
import {
  addPasswordResetEmailJob,
  addVerificationEmailJob,
} from "../queues/email.queue";

export const registerService = async (body: RegisterInput) => {
  const { email, password, name } = body;

  const existing = await db.select().from(users).where(eq(users.email, email));

  if (existing.length > 0) {
    throw new AppError("Email already in use", 409);
  }

  const hashed = await hashPassword(password);

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const [user] = await db
    .insert(users)
    .values({
      id: nanoid(),
      email,
      password: hashed,
      name,
      emailVerificationToken: hashedToken,
      emailVerificationExpiry,
    })
    .returning({ id: users.id, email: users.email, name: users.name });

  if (!user) {
    throw new AppError("Failed to create user", 500);
  }

  await addVerificationEmailJob({
    type: "verification",
    name,
    email,
    token: rawToken,
    clientUrl: Env.CLIENT_URL,
  });

  return { user };
};

export const verifyEmailService = async (token: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.emailVerificationToken, hashedToken));

  if (!user) {
    throw new AppError("Invalid or expired verification token", 400);
  }

  if (
    !user.emailVerificationExpiry ||
    user.emailVerificationExpiry < new Date()
  ) {
    throw new AppError("Verification token has expired", 400);
  }

  if (user.isEmailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  await db
    .update(users)
    .set({
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpiry: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));
};

export const loginService = async (body: LoginInput) => {
  const { email, password } = body;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!user.isEmailVerified) {
    throw new AppError("Please verify your email before logging in", 403);
  }

  const token = signAccessToken({ userId: user.id, email: user.email });

  return { token, user: { id: user.id, email: user.email, name: user.name } };
};

export const getMeService = async (userId: string) => {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      isEmailVerified: users.isEmailVerified,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return { user };
};

export const resendVerificationEmailService = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    // Don't reveal if email exists or not
    return;
  }

  if (user.isEmailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db
    .update(users)
    .set({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  await addVerificationEmailJob({
    type: "verification",
    name: user.name,
    email: user.email,
    token: rawToken,
    clientUrl: Env.CLIENT_URL,
  });
};

export const forgotPasswordService = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  // Don't reveal if email exists or not
  if (!user) return;

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  const passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1hr

  await db
    .update(users)
    .set({
      passwordResetToken: hashedToken,
      passwordResetExpiry,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  await addPasswordResetEmailJob({
    type: "password-reset",
    name: user.name,
    email: user.email,
    token: rawToken,
    clientUrl: Env.CLIENT_URL,
  });
};

export const resetPasswordService = async (
  token: string,
  newPassword: string,
) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.passwordResetToken, hashedToken));

  if (!user) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  if (!user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
    throw new AppError("Reset token has expired", 400);
  }

  const hashed = await hashPassword(newPassword);

  await db
    .update(users)
    .set({
      password: hashed,
      passwordResetToken: null,
      passwordResetExpiry: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));
};
