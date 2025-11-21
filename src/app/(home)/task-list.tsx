"use client";

import { Task } from "@/generated/prisma/browser";
import { TaskCard } from "@/components/task-card";
import { delay } from "@/lib/utils";
import { markTask } from "./actions";
import { toast } from "sonner";

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="flex flex-col gap-y-2">
      {tasks.map((task, i) => (
        <TaskCard
          key={i}
          name={task.name}
          deadline={task.deadline}
          isCompleted={task.isCompleted}
          onCheckedChange={async (isChecked) => {
            await delay(0.5);

            try {
              markTask({
                id: task.id,
                status: isChecked ? "completed" : "active",
              });
            } catch (error) {
              console.error(error);

              toast.error("Failed to mark task as completed", {
                description:
                  "Please try again, if the problem persists please contact support.",
              });
            }
          }}
        />
      ))}
    </ul>
  );
}
