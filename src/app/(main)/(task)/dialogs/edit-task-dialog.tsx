import { Dialog } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/generated/prisma/browser";
import { editTask } from "@/lib/actions/task";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useIsEditTaskDialogOpen } from "../states/is-edit-task-dialog-open";

export function EditTaskDialog({ task }: { task: Task }) {
  const router = useRouter();
  const { isEditTaskDialogOpen, setIsEditTaskDialogOpen } =
    useIsEditTaskDialogOpen();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await editTask({
          id: task.id,
          name: formData.get("name") as string,
          deadline: new Date(formData.get("deadline") as string),
        });

        toast.success("Task edited successfully", {
          description: "You can now see your edited task in the list.",
        });

        setIsEditTaskDialogOpen(false);

        router.refresh();
      } catch (error) {
        if (isRedirectError(error)) throw error;

        setError((error as Error).message);
      }
    });
  };

  return (
    <Dialog
      isOpen={isEditTaskDialogOpen}
      error={error}
      isPending={isPending}
      onOpenChange={setIsEditTaskDialogOpen}
      title="Edit task"
      description="Edit your existing task"
      positiveActionText="Save"
      onSubmit={onSubmit}
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
            defaultValue={task.name}
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
              defaultValue={task.deadline.toISOString().split("T")[0]}
              required
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
