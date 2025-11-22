"use client";

import { Task } from "@/generated/prisma/browser";
import { TaskCard } from "@/components/task-card";
import { delay } from "@/lib/utils";
import { toast } from "sonner";
import { markTask } from "@/lib/actions/task";

export function TaskList({
  type,
  tasks,
}: {
  type: "active" | "completed";
  tasks: Task[];
}) {
  // If there is no task at all
  if (!tasks.length)
    return (
      <span className="text-center text-lg font-medium italic">
        You have no {type} tasks
      </span>
    );

  return (
    <ul className="flex flex-col gap-y-2">
      {tasks.map((task, i) => (
        <TaskCard
          key={i}
          name={task.name}
          deadline={task.deadline}
          isCompleted={task.isCompleted}
          onCheckedChange={async (isChecked) => {
            // Add delay to create an animation-like effect
            await delay(0.5);

            try {
              markTask({
                id: task.id,
                status: isChecked ? "completed" : "active",
              });
            } catch (error) {
              toast.error(
                `Failed to mark task as ${type === "active" ? "completed" : "active"}`,
                {
                  description: (error as Error).message,
                },
              );
            }
          }}
        />
      ))}
    </ul>
  );
}
