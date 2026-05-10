import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";

export const metadata = { title: "Reset Password | Sniplink" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-red-500 font-medium">
          Invalid or missing reset token.
        </p>
        <Link
          href="/forgot-password"
          className="text-primary-600 text-sm mt-2 inline-block hover:underline"
        >
          Request a new one
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Reset password</h2>
      <p className="text-gray-500 text-sm mb-6">
        Enter your new password below
      </p>
      <ResetPasswordForm token={token} />
    </div>
  );
}
