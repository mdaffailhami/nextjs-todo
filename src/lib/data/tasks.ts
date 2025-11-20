import "server-only";
import { delay } from "../utils";
import prisma from "../prisma";
import { Prisma } from "@/generated/prisma/client";

type GetTasksByUserEmailProps = {
  email: string;
  status?: "active" | "completed";
};

export async function getTasksByUserEmail({
  email,
  status,
}: GetTasksByUserEmailProps) {
  await delay(2);

  const whereClause: Prisma.TaskWhereInput = {
    user: {
      email: email,
    },
  };

  if (status !== undefined) {
    whereClause.isCompleted = status === "completed";
  }

  const tasks = await prisma.task.findMany({
    where: whereClause,
  });

  return tasks;
}
