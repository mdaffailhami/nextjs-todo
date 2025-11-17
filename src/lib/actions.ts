"use server";

import jwt from "jsonwebtoken";
import { cookies as useCookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { checkPassword, hashPassword } from "@/lib/utils/server";
import { generateRandomNumber } from "./utils";

export async function signIn({
  email,
  password,
}: Readonly<{
  email: string;
  password: string;
}>): Promise<{ token: string }> {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) throw new Error("Email not registered");

  const isMatch = await checkPassword({
    password: password,
    hashedPassword: user.hashedPassword,
  });

  if (!isMatch) throw new Error("Incorrect password");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!,
    { expiresIn: "7d" },
  );

  return { token };
}

export async function signOut() {
  const cookies = await useCookies();

  cookies.delete("session_token");
  redirect("/signin");
}

export async function sendPasswordResetEmail(to: string) {
  const user = await prisma.user.findUnique({ where: { email: to } });

  if (!user) throw new Error("Email not registered");

  // Generate verification code
  const code = generateRandomNumber(100000, 999999).toString();

  const body = {
    to: to,
    subject: "NextJS E-commerce - Password Reset",
    text: `Your password reset verification code is: ${code}`,
    html: `Your password reset verification code is: <b>${code}</b>`,
  };

  // Make a POST request to the Google Script that will send the email
  const res = await fetch(process.env.GOOGLE_SCRIPT_PASSWORD_RESET_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { error, message } = await res.json();

  if (error) throw new Error(message);

  // Hash code (For JWT)
  const hashedCode = await hashPassword(code);

  const token = jwt.sign(
    { email: to, code: hashedCode },
    process.env.JWT_KEY!,
    { expiresIn: "15m" },
  );

  return { token };
}
