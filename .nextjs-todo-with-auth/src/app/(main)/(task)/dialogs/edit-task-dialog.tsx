import { Dialog } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/generated/prisma/browser";
import { editTask } from "@/app/(main)/(task)/actions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { useIsEditTaskDialogOpen } from "../states/is-edit-task-dialog-open";

export function EditTaskDialog({ task }: { task: Task }) {
  const router = useRouter();
  const { isEditTaskDialogOpen, setIsEditTaskDialogOpen } =
    useIsEditTaskDialogOpen();

  const [editTaskRes, editTaskAction, isEditTaskPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const name = formData.get("name") as string;
      const deadline = new Date(formData.get("deadline") as string);

      const response = await editTask({
        id: task.id,
        name,
        deadline,
      });

      if (response.isError) {
        return response;
      }

      toast.success(response.message, {
        description: "You can now see your edited task in the list.",
      });

      setIsEditTaskDialogOpen(false);

      router.refresh();
      return response;
    },
    undefined,
  );

  return (
    <Dialog
      isOpen={isEditTaskDialogOpen}
      error={editTaskRes?.isError ? editTaskRes.message : null}
      isPending={isEditTaskPending}
      onOpenChange={setIsEditTaskDialogOpen}
      title="Edit task"
      description="Edit your existing task"
      positiveActionText="Save"
      onSubmit={editTaskAction}
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
