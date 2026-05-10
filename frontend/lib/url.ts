import { cookies } from "next/headers";
import { api } from "./api";
import type { Url, UrlStats } from "@/types/url";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return { Cookie: `accessToken=${token}` };
};

export const getUrls = async (): Promise<Url[]> => {
  try {
    const response = await api.get("/urls", {
      headers: await getAuthHeader(),
    });
    return response.data.urls;
  } catch {
    return [];
  }
};

export const getUrlStats = async (id: string): Promise<UrlStats | null> => {
  try {
    const response = await api.get(`/urls/${id}/stats`, {
      headers: await getAuthHeader(),
    });
    return response.data;
  } catch {
    return null;
  }
};
