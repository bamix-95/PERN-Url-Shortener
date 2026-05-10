import { getUrls } from "@/lib/url";
import { UrlCard } from "./UrlCard";

export const UrlList = async () => {
  const urls = await getUrls();

  if (urls.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-gray-400 text-sm text-center py-8">
          No links yet. Create your first short URL above!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">
          Your Links ({urls.length})
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {urls.map((url) => (
          <UrlCard key={url.id} url={url} />
        ))}
      </div>
    </div>
  );
};
