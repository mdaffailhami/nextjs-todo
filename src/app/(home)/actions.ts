"use server";

import { getSignedInUser } from "@/lib/data/user";
import prisma from "@/lib/prisma";
import { delay } from "@/lib/utils";

export async function markTask({
  id,
  status,
}: {
  id: string;
  status: "active" | "completed";
}) {
  await delay(2);

  // Get signed in user
  const signedInUser = await getSignedInUser();

  // If user not signed in
  if (!signedInUser) throw new Error("User not signed in");

  // Update task
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      isCompleted: status === "completed",
    },
  });
}
