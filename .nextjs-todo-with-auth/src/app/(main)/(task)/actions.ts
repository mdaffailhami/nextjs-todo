"use server";

import { Prisma, Task } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/utils/server";
import { ServerResponse } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";

export async function getTasks({
  category = "all",
}: {
  category?: "all" | "active" | "completed";
}): Promise<ServerResponse<Task[]>> {
  const token = await verifySession();

  try {
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

    return {
      isError: false,
      message: "Tasks fetched successfully",
      data: tasks,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: [] };
  }
}

export async function markTask({
  id,
  status,
}: {
  id: string;
  status: "active" | "completed";
}): Promise<ServerResponse> {
  const token = await verifySession();

  try {
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

    return {
      isError: false,
      message: `Task marked as ${status}`,
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function addTask({
  name,
  deadline,
}: {
  name: string;
  deadline: Date;
}): Promise<ServerResponse> {
  const token = await verifySession();

  try {
    // Create task
    await prisma.task.create({
      data: {
        name,
        deadline,
        user: { connect: { email: token.email } },
      },
    });

    return {
      isError: false,
      message: "Task added successfully",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function editTask({
  id,
  name,
  deadline,
}: {
  id: string;
  name: string;
  deadline: Date;
}): Promise<ServerResponse> {
  const token = await verifySession();

  try {
    // Update task
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

    return {
      isError: false,
      message: "Task edited successfully",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function deleteTask({
  id,
}: {
  id: string;
}): Promise<ServerResponse> {
  const token = await verifySession();

  try {
    // Delete task
    await prisma.task.delete({
      where: {
        id,
        user: { email: token.email },
      },
    });

    return {
      isError: false,
      message: "Task deleted successfully",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}
