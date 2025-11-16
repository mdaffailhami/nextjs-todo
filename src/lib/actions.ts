"use server";

import jwt from "jsonwebtoken";
import { cookies as useCookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { User } from "@/generated/prisma/client";
import { checkPassword } from "@/lib/utils/server";

export async function signIn({
  email,
  password,
}: Readonly<{
  email: string;
  password: string;
}>): Promise<{ user: User; session: string }> {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) throw new Error("Email not registered");

  const isMatch = await checkPassword({
    password: password,
    hashedPassword: user.hashedPassword,
  });

  if (!isMatch) throw new Error("Incorrect password");

  const session = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!,
    { expiresIn: "7d" },
  );

  return { user, session };
}

export async function signOut() {
  const cookies = await useCookies();

  cookies.delete("session");
  redirect("/signin");
}
