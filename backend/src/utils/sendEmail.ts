import { verificationEmailTemplate } from "../emails/verificationEmail";
import { logger } from "../config/logger";
import { resend } from "../config/resend.config";
import { passwordResetEmailTemplate } from "../emails/passwordResetEmail";

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string,
  clientUrl: string,
): Promise<void> => {
  const verificationUrl = `${clientUrl}/verify-email?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Sniplink <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email address",
    html: verificationEmailTemplate(name, verificationUrl),
  });

  if (error) {
    logger.error("Failed to send verification email", { error, email });
    throw new Error("Failed to send verification email");
  }

  logger.info(`Verification email sent to ${email}`);
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string,
  clientUrl: string,
): Promise<void> => {
  const resetUrl = `${clientUrl}/reset-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Sniplink <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: passwordResetEmailTemplate(name, resetUrl),
  });

  if (error) {
    logger.error("Failed to send password reset email", { error, email });
    throw new Error("Failed to send password reset email");
  }

  logger.info(`Password reset email sent to ${email}`);
};
