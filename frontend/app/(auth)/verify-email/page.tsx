import { VerifyEmailResult } from "@/components/auth/VerifyEmailResult";
import { api } from "@/lib/api";

export const metadata = { title: "Verify Email | Sniplink" };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <VerifyEmailResult success={false} message="Invalid or missing token." />
    );
  }

  let success = false;
  let message = "Invalid or expired verification link.";

  try {
    await api.get(`/auth/verify-email?token=${token}`);
    success = true;
    message = "Email verified successfully! You can now log in.";
  } catch {}

  return <VerifyEmailResult success={success} message={message} />;
}
