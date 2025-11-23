"use client";

import { Task } from "@/generated/prisma/browser";
import { TaskCard } from "@/components/task-card";
import { toast } from "sonner";
import { markTask } from "@/lib/actions/task";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState } from "react";
import { EditTaskDialog } from "./edit-task-dialog";
import { DeleteTaskDialog } from "./delete-task-dialog";

export function TaskListSection({
  type,
  tasks,
}: {
  type: "active" | "completed";
  tasks: Task[];
}) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  let isPending = false;

  if (!tasks.length)
    return (
      <span className="text-center text-lg font-medium italic">
        You have no {type} tasks
      </span>
    );

  return (
    <>
      <ul className="flex flex-col gap-y-2">
        {tasks.map((task, i) => (
          <TaskCard
            key={i}
            name={task.name}
            deadline={task.deadline}
            isCompleted={task.isCompleted}
            excludeEditButton={type === "completed"}
            onCheckedChange={async (isChecked) => {
              if (isPending) return;

              isPending = true;
              try {
                await markTask({
                  id: task.id,
                  status: isChecked ? "completed" : "active",
                });

                toast.success(
                  `Task marked as ${isChecked ? "completed" : "active"}`,
                  {
                    description: `You can now see your ${isChecked ? "completed" : "active"} tasks in the ${isChecked ? "completed" : "active"} tab`,
                  },
                );

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
              isPending = false;
            }}
            onEditButtonPress={() => {
              setSelectedTask(task);
              setIsEditDialogOpen(true);
            }}
            onDeleteButtonPress={() => {
              setSelectedTask(task);
              setIsDeleteDialogOpen(true);
            }}
          />
        ))}
      </ul>
      {selectedTask && (
        <>
          <EditTaskDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            task={selectedTask}
          />
          <DeleteTaskDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
            task={selectedTask}
          />
        </>
      )}
    </>
  );
}
