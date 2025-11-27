"use client";

import { Task } from "@/generated/prisma/browser";
import { TaskCard } from "@/components/task-card";
import { toast } from "sonner";
import { markTask } from "@/app/(main)/(task)/actions";
import { useRouter } from "next/navigation";
import { useActionState, useState, startTransition } from "react";
import { AddTaskDialog } from "./dialogs/add-task-dialog";
import { EditTaskDialog } from "./dialogs/edit-task-dialog";
import { DeleteTaskDialog } from "./dialogs/delete-task-dialog";
import { useIsEditTaskDialogOpen } from "./states/is-edit-task-dialog-open";
import { useIsDeleteTaskDialogOpen } from "./states/is-delete-task-dialog-open";

export function TaskListSection({
  type,
  tasks,
}: {
  type: "active" | "completed";
  tasks: Task[];
}) {
  const router = useRouter();
  const { setIsEditTaskDialogOpen } = useIsEditTaskDialogOpen();
  const { setIsDeleteTaskDialogOpen } = useIsDeleteTaskDialogOpen();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [, markTaskReq, isMarkTaskPending] = useActionState(
    async (_: unknown, params: Parameters<typeof markTask>[0]) => {
      const response = await markTask(params);

      if (response.isError) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }

      router.refresh();
    },
    null,
  );

  return (
    <>
      {tasks.length === 0 && (
        <span className="text-center text-lg font-medium italic">
          You have no {type} tasks
        </span>
      )}
      {tasks.length > 0 && (
        <ul className="flex flex-col gap-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              name={task.name}
              deadline={task.deadline}
              isCompleted={task.isCompleted}
              excludeEditButton={type === "completed"}
              onCheckedChange={(isChecked) => {
                if (isMarkTaskPending) return;

                startTransition(() => {
                  markTaskReq({
                    id: task.id,
                    status: isChecked ? "completed" : "active",
                  });
                });
              }}
              onEditButtonPress={() => {
                setSelectedTask(task);
                setIsEditTaskDialogOpen(true);
              }}
              onDeleteButtonPress={() => {
                setSelectedTask(task);
                setIsDeleteTaskDialogOpen(true);
              }}
            />
          ))}
        </ul>
      )}
      {type === "active" && <AddTaskDialog />}
      {type === "active" && selectedTask && (
        <EditTaskDialog task={selectedTask} />
      )}
      {selectedTask && <DeleteTaskDialog task={selectedTask} />}
    </>
  );
}
