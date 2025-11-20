import "server-only";

import prisma from "../prisma";
import { hashText } from "../utils/server";
import jwt from "jsonwebtoken";
import { cookies as nextCookies } from "next/headers";
import { delay } from "../utils";

export async function getUserByEmail(email: string) {
  await delay(2);

  const user = await prisma.user.findUnique({ where: { email: email } });

  return user;
}

export async function getSignedInUser() {
  await delay(2);

  const cookies = await nextCookies();

  try {
    // Get session token from cookies
    const sessionToken = cookies.get("session_token")?.value;

    // If session token doesn't exist
    if (!sessionToken) return null;

    // Verify session token
    const token = jwt.verify(sessionToken, process.env.JWT_KEY!);

    // Check if token exists and is valid
    if (typeof token !== "object") return null;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    // If user doesn't exist
    if (!user) return null;

    return user;
  } catch {
    return null;
  }
}

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await delay(2);

  // Create new user
  await prisma.user.create({
    data: {
      email,
      hashedPassword: await hashText(password),
    },
  });
}

export async function changeUserPassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  await delay(2);

  const user = await getUserByEmail(email);

  if (!user) throw new Error("User not found");

  await prisma.user.update({
    where: { email },
    data: {
      hashedPassword: await hashText(newPassword),
    },
  });
}
