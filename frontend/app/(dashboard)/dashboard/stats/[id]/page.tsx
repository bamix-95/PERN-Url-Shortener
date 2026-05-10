import { notFound } from "next/navigation";
import Link from "next/link";
import { getUrlStats } from "@/lib/url";

export default async function StatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getUrlStats(id);

  if (!data) notFound();

  const { url, totalClicks, clicks } = data;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-primary-600 transition"
        >
          ← Back to dashboard
        </Link>
      </div>

      {/* URL info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Link Stats</h2>
        <p className="text-sm text-primary-600 font-medium">{url.shortUrl}</p>
        <p className="text-xs text-gray-400 truncate mt-1">{url.originalUrl}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Clicks</p>
          <p className="text-4xl font-bold text-gray-900 mt-1">{totalClicks}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Created</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {new Date(url.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Click history */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Click History</h3>
        </div>
        {clicks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            No clicks yet
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {clicks.map((click) => (
              <div key={click.id} className="px-6 py-3">
                <p className="text-sm text-gray-600">
                  {new Date(click.clickedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
