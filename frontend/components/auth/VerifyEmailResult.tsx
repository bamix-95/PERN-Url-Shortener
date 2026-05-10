import Link from "next/link";

interface VerifyEmailResultProps {
  success: boolean;
  message: string;
}

export const VerifyEmailResult = ({
  success,
  message,
}: VerifyEmailResultProps) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
    <div className="text-4xl mb-4">{success ? "✅" : "❌"}</div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">
      {success ? "Email Verified!" : "Verification Failed"}
    </h2>
    <p className="text-gray-500 text-sm mb-6">{message}</p>
    {success ? (
      <Link
        href="/login"
        className="inline-block bg-primary-500 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-600 transition"
      >
        Go to Login
      </Link>
    ) : (
      <Link
        href="/forgot-password"
        className="text-primary-600 text-sm font-medium hover:underline"
      >
        Request a new link
      </Link>
    )}
  </div>
);
