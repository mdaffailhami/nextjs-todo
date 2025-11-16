import "server-only";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { User } from "@/generated/prisma/client";
import { cookies as nextCookies } from "next/headers";

export async function checkSession() {
  const cookies = await nextCookies();
  const session = cookies.get("session")?.value;

  if (!session) return null;

  try {
    return jwt.verify(session, process.env.JWT_KEY);
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
    process.env.JWT_KEY,
    { expiresIn: "7d" },
  );

  return { user, session };
}

export async function signOut() {
  const cookies = await nextCookies();

  cookies.delete("session");
}
