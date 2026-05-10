import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = { title: "Register | Sniplink" };

export default function RegisterPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Create account</h2>
      <p className="text-gray-500 text-sm mb-6">
        Start shortening URLs for free
      </p>
      <RegisterForm />
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
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
