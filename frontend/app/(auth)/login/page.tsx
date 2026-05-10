import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata = { title: "Login | Sniplink" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string; reset?: string }>;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
      <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>
      <LoginForm searchParams={searchParams} />
      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
      <p className="text-center text-sm text-gray-500 mt-2">
        <Link
          href="/forgot-password"
          className="text-primary-600 font-medium hover:underline"
        >
          Forgot password?
        </Link>
      </p>
    </div>
  );
}
