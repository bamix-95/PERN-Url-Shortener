"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";

type ActionState =
  | { success: boolean; message: string; shortUrl?: string }
  | undefined;

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return { Cookie: `accessToken=${token}` };
};

export const createUrlAction = async (
  _state: ActionState,
  formData: FormData,
) => {
  try {
    const body: Record<string, string> = {
      originalUrl: formData.get("originalUrl") as string,
    };

    const customSlug = formData.get("customSlug") as string;
    if (customSlug) body.customSlug = customSlug;

    const response = await api.post("/urls", body, {
      headers: await getAuthHeader(),
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "URL shortened successfully",
      shortUrl: response.data.url.shortUrl,
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const deleteUrlAction = async (id: string) => {
  try {
    await api.delete(`/urls/${id}`, {
      headers: await getAuthHeader(),
    });

    revalidatePath("/dashboard");
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};
