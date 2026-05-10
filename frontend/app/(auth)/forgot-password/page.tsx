import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

export const metadata = { title: "Forgot Password | Sniplink" };

export default function ForgotPasswordPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Forgot password?
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Enter your email and we&apos;ll send you a reset link
      </p>
      <ForgotPasswordForm />
      <p className="text-center text-sm text-gray-500 mt-6">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-primary-600 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
