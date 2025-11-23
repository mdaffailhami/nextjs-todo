import { Dialog } from "@/components/dialog";
import { Task } from "@/generated/prisma/browser";
import { deleteTask } from "@/lib/actions/task";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function DeleteTaskDialog({
  isOpen,
  setIsOpen,
  task,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: Task;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        await deleteTask({ id: task.id });

        toast.success("Task deleted successfully", {
          description: `Your task "${task.name}" has been deleted.`,
        });

        setIsOpen(false);

        router.refresh();
      } catch (error) {
        if (isRedirectError(error)) throw error;

        setError((error as Error).message);
      }
    });
  };

  return (
    <Dialog
      type="destructive"
      isOpen={isOpen}
      error={error}
      isPending={isPending}
      onOpenChange={setIsOpen}
      title="Delete task"
      description={`Are you sure you want to delete this "${task.name}" task?`}
      positiveActionText="Delete"
      onSubmit={onSubmit}
    />
  );
}
