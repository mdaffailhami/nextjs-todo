import "server-only";
import prisma from "../prisma";
import { hashPassword } from "../utils/server";

export async function changeUserPassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  await prisma.user.update({
    where: { email },
    data: {
      hashedPassword: await hashPassword(newPassword),
    },
  });
}
