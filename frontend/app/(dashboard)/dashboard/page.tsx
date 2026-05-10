import { getMe } from "@/lib/auth";
import { CreateUrlForm } from "@/components/dashboard/CreateUrlForm";
import { UrlList } from "@/components/dashboard/UrlList";
import { getUrls } from "@/lib/url";

export const metadata = { title: "Dashboard | Sniplink" };

export default async function DashboardPage() {
  const [user, urls] = await Promise.all([getMe(), getUrls()]);

  const totalClicks = urls.reduce((acc, url) => acc + url.clickCount, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome back, {user?.name} 👋
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Manage and track all your shortened URLs here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Links", value: urls.length },
          { label: "Total Clicks", value: totalClicks },
          { label: "Active Links", value: urls.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <CreateUrlForm />
      <UrlList />
    </div>
  );
}
