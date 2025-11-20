import "server-only";
import prisma from "../prisma";
import { hashText } from "../utils/server";
import { User } from "@/generated/prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email: email } });

  return user;
}

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
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
}): Promise<void> {
  const user = await getUserByEmail(email);

  if (!user) throw new Error("User not found");

  await prisma.user.update({
    where: { email },
    data: {
      hashedPassword: await hashText(newPassword),
    },
  });
}
