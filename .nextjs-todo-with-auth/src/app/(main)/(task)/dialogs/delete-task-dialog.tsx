import { Dialog } from "@/components/dialog";
import { Task } from "@/generated/prisma/browser";
import { deleteTask } from "@/app/(main)/(task)/actions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { useIsDeleteTaskDialogOpen } from "../states/is-delete-task-dialog-open";

export function DeleteTaskDialog({ task }: { task: Task }) {
  const router = useRouter();
  const { isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen } =
    useIsDeleteTaskDialogOpen();
  const [deleteTaskRes, deleteTaskAction, isDeleteTaskPending] = useActionState(
    async () => {
      const response = await deleteTask({ id: task.id });

      if (response.isError) {
        return response;
      }

      toast.success(response.message, {
        description: `Your task "${task.name}" has been deleted.`,
      });

      setIsDeleteTaskDialogOpen(false);

      router.refresh();
      return response;
    },
    undefined,
  );

  return (
    <Dialog
      type="destructive"
      isOpen={isDeleteTaskDialogOpen}
      error={deleteTaskRes?.isError ? deleteTaskRes.message : null}
      isPending={isDeleteTaskPending}
      onOpenChange={setIsDeleteTaskDialogOpen}
      title="Delete task"
      description={`Are you sure you want to delete this "${task.name}" task?`}
      positiveActionText="Delete"
      onSubmit={deleteTaskAction}
    />
  );
}
