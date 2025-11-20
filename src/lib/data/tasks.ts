import "server-only";

import { delay } from "../utils";
import prisma from "../prisma";
import { Prisma } from "@/generated/prisma/client";
import { cookies as nextCookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSignedInUserTasks({
  category = "all",
}: {
  category: "all" | "active" | "completed";
}) {
  await delay(2);

  const cookies = await nextCookies();

  // Get session token from cookies
  const sessionToken = cookies.get("session_token")?.value;

  if (!sessionToken) return [];

  // Verify session token
  const token = jwt.verify(sessionToken, process.env.JWT_KEY!);

  if (typeof token !== "object") return [];

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
