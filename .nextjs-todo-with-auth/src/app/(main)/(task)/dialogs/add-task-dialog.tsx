"use client";

import { Dialog } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTask } from "@/app/(main)/(task)/actions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { useIsAddTaskDialogOpen } from "../states/is-add-task-dialog-open";

export function AddTaskDialog() {
  const router = useRouter();

  const { isAddTaskDialogOpen, setIsAddTaskDialogOpen } =
    useIsAddTaskDialogOpen();

  const [addTaskRes, addTaskAction, isAddTaskPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const name = formData.get("name") as string;
      const deadline = new Date(formData.get("deadline") as string);

      const response = await addTask({
        name,
        deadline,
      });

      if (response.isError) {
        return response;
      }

      toast.success(response.message, {
        description: "You can now see your new task in the list.",
      });

      setIsAddTaskDialogOpen(false);

      router.refresh();
      return response;
    },
    undefined,
  );

  return (
    <Dialog
      isOpen={isAddTaskDialogOpen}
      error={addTaskRes?.isError ? addTaskRes.message : null}
      isPending={isAddTaskPending}
      onOpenChange={setIsAddTaskDialogOpen}
      title="Add new task"
      description="Enter the new task you want to add"
      positiveActionText="Add"
      onSubmit={addTaskAction}
    >
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Task</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your task"
            type="text"
            autoComplete="off"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="deadline">Deadline</Label>
          <div className="flex flex-row gap-x-2">
            <Input
              id="deadline"
              name="deadline"
              // Make the calendar logo dark if it's dark mode
              className="dark:scheme-dark"
              placeholder="Enter your task deadline"
              type="date"
              required
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
