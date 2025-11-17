import "server-only";
import prisma from "../prisma";
import { hashPassword } from "../utils/server";
import { User } from "@/generated/prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email: email } });

  return user;
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
      hashedPassword: await hashPassword(newPassword),
    },
  });
}
