import { cache } from "react";
import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/auth";

export const getMe = cache(async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return null;

    const response = await api.get("/auth/me", {
      headers: { Cookie: `accessToken=${token}` },
    });

    return response.data.user as User;
  } catch {
    return null;
  }
});
