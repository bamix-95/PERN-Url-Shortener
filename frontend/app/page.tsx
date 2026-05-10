import { redirect } from "next/navigation";
import { getMe } from "@/lib/auth";

export default async function HomePage() {
  const user = await getMe();
  redirect(user ? "/dashboard" : "/login");
}
