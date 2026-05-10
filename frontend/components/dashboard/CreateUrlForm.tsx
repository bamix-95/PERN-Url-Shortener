"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { createUrlAction } from "@/lib/actions/url.actions";

export const CreateUrlForm = () => {
  const [state, action, isPending] = useActionState(createUrlAction, undefined);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Shorten a URL</h3>
      <form action={action} className="flex flex-col gap-4">
        {state && (
          <Alert
            type={state.success ? "success" : "error"}
            message={
              state.success && state.shortUrl
                ? `${state.message} → ${state.shortUrl}`
                : state.message
            }
          />
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              id="originalUrl"
              name="originalUrl"
              label="Long URL"
              type="url"
              placeholder="https://example.com/very/long/url"
              required
            />
          </div>
          <div className="sm:w-48">
            <Input
              id="customSlug"
              name="customSlug"
              label="Custom slug (optional)"
              type="text"
              placeholder="my-link"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-full sm:w-40">
            <Button loading={isPending} type="submit">
              Shorten URL
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
