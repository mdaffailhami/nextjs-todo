import "server-only";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies as useCookies } from "next/headers";

export async function checkSession() {
  const cookies = await useCookies();
  const session = cookies.get("session")?.value;

  if (!session) return null;

  try {
    return jwt.verify(session, process.env.JWT_KEY!);
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function checkPassword({
  password,
  hashedPassword,
}: Readonly<{
  password: string;
  hashedPassword: string;
}>): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error checking password:", error);
    throw error;
  }
}
