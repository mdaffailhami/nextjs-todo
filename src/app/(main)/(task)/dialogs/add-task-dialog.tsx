import { Dialog } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTask } from "@/lib/actions/task";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useIsAddTaskDialogOpen } from "../states/is-add-task-dialog-open";

export function AddTaskDialog() {
  const router = useRouter();
  const { isAddTaskDialogOpen, setIsAddTaskDialogOpen } =
    useIsAddTaskDialogOpen();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await addTask({
          name: formData.get("name") as string,
          deadline: new Date(formData.get("deadline") as string),
        });

        toast.success("Task added successfully", {
          description: "You can now see your new task in the list.",
        });

        setIsAddTaskDialogOpen(false);

        router.refresh();
      } catch (error) {
        if (isRedirectError(error)) throw error;

        setError((error as Error).message);
      }
    });
  };

  return (
    <Dialog
      isOpen={isAddTaskDialogOpen}
      error={error}
      isPending={isPending}
      onOpenChange={setIsAddTaskDialogOpen}
      title="Add new task"
      description="Enter the new task you want to add"
      positiveActionText="Add"
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
