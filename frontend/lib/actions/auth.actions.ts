"use server";

import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type ActionState = { success: boolean; message: string } | undefined;

export const registerAction = async (
  _state: ActionState,
  formData: FormData,
) => {
  try {
    await api.post("/auth/register", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    redirect("/login?registered=true");
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const loginAction = async (_state: ActionState, formData: FormData) => {
  try {
    const response = await api.post("/auth/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Forward the cookie from Express to the browser
    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      const cookieStore = await cookies();
      setCookie.forEach((cookie) => {
        const [nameValue] = cookie.split(";");
        const [name, value] = nameValue.split("=");
        cookieStore.set(name.trim(), value.trim(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24, // 1 day
        });
      });
    }
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }

  redirect("/dashboard");
};

export const forgotPasswordAction = async (
  _state: ActionState,
  formData: FormData,
) => {
  try {
    await api.post("/auth/forgot-password", {
      email: formData.get("email"),
    });

    return {
      success: true,
      message: "If that email exists, a reset link has been sent.",
    };
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }
};

export const resetPasswordAction = async (
  token: string,
  _state: ActionState,
  formData: FormData,
) => {
  try {
    await api.post(`/auth/reset-password?token=${token}`, {
      password: formData.get("password"),
    });
  } catch (error) {
    return { success: false, message: getErrorMessage(error) };
  }

  redirect("/login?reset=true");
};

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      await api.post(
        "/auth/logout",
        {},
        { headers: { Cookie: `accessToken=${token}` } },
      );
    }
  } catch {}

  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login");
};
