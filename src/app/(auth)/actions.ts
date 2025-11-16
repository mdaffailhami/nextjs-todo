"use server";

import { signIn } from "@/lib/actions";
import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSignin(
  formData: FormData,
): Promise<{ error: string | null }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookies = await nextCookies();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  let user, session;
  try {
    const res = await signIn({ email, password });
    user = res.user;
    session = res.session;

    cookies.set({
      name: "session",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    return { error: (error as Error).message };
  }

  if (user) redirect("/");
  return { error: null };
}
