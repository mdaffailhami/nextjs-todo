"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/utils/server";

export async function getTasks(
  category: "all" | "active" | "completed" = "all",
) {
  const token = await verifySession();

  const whereClause: Prisma.TaskWhereInput = {
    user: {
      email: token.email,
    },
  };

  // Filter tasks based on category
  if (category !== "all") {
    whereClause.isCompleted = category === "completed";
  }

  const tasks = await prisma.task.findMany({
    where: whereClause,
  });

  return tasks;
}

export async function markTask({
  id,
  status,
}: {
  id: string;
  status: "active" | "completed";
}) {
  const token = await verifySession();

  // Update task
  await prisma.task.update({
    where: {
      id,
      user: { email: token.email },
    },
    data: {
      isCompleted: status === "completed",
    },
  });
}
