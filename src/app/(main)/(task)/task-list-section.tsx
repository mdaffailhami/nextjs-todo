"use client";

import { Task } from "@/generated/prisma/browser";
import { TaskCard } from "@/components/task-card";
import { toast } from "sonner";
import { markTask } from "@/lib/actions/task";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function TaskListSection({
  type,
  tasks,
}: {
  type: "active" | "completed";
  tasks: Task[];
}) {
  const router = useRouter();

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
            try {
              await markTask({
                id: task.id,
                status: isChecked ? "completed" : "active",
              });

              router.refresh();
            } catch (error) {
              toast.error(
                `Failed to mark task as ${type === "active" ? "completed" : "active"}`,
                {
                  description: (error as Error).message,
                },
              );

              if (isRedirectError(error)) throw error;
            }
          }}
        />
      ))}
    </ul>
  );
}
