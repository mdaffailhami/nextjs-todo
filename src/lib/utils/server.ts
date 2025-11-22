import "server-only";

import bcrypt from "bcrypt";
import { delay } from ".";
import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export async function hashText(password: string): Promise<string> {
  await delay(2);

  const saltRounds = 12;

  try {
    const hashedText = await bcrypt.hash(password, saltRounds);
    return hashedText;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function verifyHashedText({
  text,
  hashedText,
}: Readonly<{
  text: string;
  hashedText: string;
}>): Promise<boolean> {
  await delay(2);

  try {
    const isMatch = await bcrypt.compare(text, hashedText);
    return isMatch;
  } catch (error) {
    console.error("Error checking text:", error);
    throw error;
  }
}

export async function sendEmail(body: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  await delay(2);

  const res = await fetch(process.env.GOOGLE_SCRIPT_PASSWORD_RESET_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { error, message } = await res.json();

  if (error) throw new Error(message);
}

export async function verifySession() {
  const cookies = await nextCookies();

  // Get session token from cookies
  const sessionToken = cookies.get("session_token")?.value;

  // If session token doesn't exist
  if (!sessionToken) redirect("/signin");

  // Verify session token
  const token = jwt.verify(sessionToken, process.env.JWT_KEY!);

  // Check if token exists and is valid
  if (typeof token !== "object") redirect("/signin");

  return token as jwt.JwtPayload & { id: string; email: string };
}
