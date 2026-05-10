import { getMe } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-bold text-primary-600 shrink-0">
            ✂️ <span className="hidden sm:inline">Sniplink</span>
          </h1>

          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-600 hidden sm:block truncate max-w-40">
                Hi,{" "}
                <span className="font-medium text-gray-900">{user.name}</span>
              </span>
            </div>

            <div className="w-px h-4 bg-gray-200 shrink-0" />

            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm text-gray-500 hover:text-red-500 font-medium transition whitespace-nowrap"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden text-xs">Exit</span>
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
