import "server-only";

import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function hashText(text: string): Promise<string> {
  const saltRounds = 12;

  return await bcrypt.hash(text, saltRounds);
}

export async function verifyHashedText({
  text,
  hashedText,
}: Readonly<{
  text: string;
  hashedText: string;
}>): Promise<boolean> {
  return await bcrypt.compare(text, hashedText);
}

export async function sendEmail(body: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const res = await fetch(process.env.GOOGLE_SCRIPT_EMAIL_SENDER_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { isError, message } = await res.json();

  if (isError) throw new Error(message);
}

export async function verifySession() {
  const cookies = await nextCookies();

  // Get session token from cookies
  const sessionToken = cookies.get("session_token")?.value;

  // If session token doesn't exist
  if (!sessionToken) redirect("/signin");

  // Verify session token
  const token = jwt.verify(sessionToken, process.env.JWT_KEY!);

  // if token doesn't exist or is invalid
  if (typeof token !== "object") redirect("/signin");

  return token as jwt.JwtPayload & { id: string; email: string };
}
