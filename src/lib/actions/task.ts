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
    orderBy: {
      // Sort by the closest deadline first
      deadline: "asc",
    },
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

export async function addTask({
  name,
  deadline,
}: {
  name: string;
  deadline: Date;
}) {
  const token = await verifySession();

  // Create task
  await prisma.task.create({
    data: {
      name,
      deadline,
      user: { connect: { email: token.email } },
    },
  });
}

export async function editTask({
  id,
  name,
  deadline,
}: {
  id: string;
  name: string;
  deadline: Date;
}) {
  const token = await verifySession();

  // Create task
  await prisma.task.update({
    where: {
      id,
      user: { email: token.email },
    },
    data: {
      name,
      deadline,
    },
  });
}

export async function deleteTask({ id }: { id: string }) {
  const token = await verifySession();

  // Delete task
  await prisma.task.delete({
    where: {
      id,
      user: { email: token.email },
    },
  });
}
