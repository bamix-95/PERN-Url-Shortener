"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteUrlAction } from "@/lib/actions/url.actions";
import type { Url } from "@/types/url";

export const UrlCard = ({ url }: { url: Url }) => {
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    setDeleting(true);
    await deleteUrlAction(url.id);
    setDeleting(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary-600 truncate">
          {url.shortUrl}
        </p>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {url.originalUrl}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <p className="text-xs text-gray-300">
            {new Date(url.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-400 font-medium">
            {url.clickCount} {url.clickCount === 1 ? "click" : "clicks"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <Link
          href={`/dashboard/stats/${url.id}`}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
        >
          Stats
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
