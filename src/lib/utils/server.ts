import "server-only";

import bcrypt from "bcrypt";
import { delay } from ".";

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

export async function checkHashedText({
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
