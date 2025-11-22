import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PendingBar } from "./ui/pending-bar";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

type FormDialogProps = {
  isOpen: boolean;
  error: string | null;
  isPending: boolean;
  title: string;
  description: string;
  negativeActionText?: string;
  positiveActionText?: string;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (formData: FormData) => void;
  children: React.ReactNode;
};

export function FormDialog({
  isOpen,
  error,
  isPending,
  title,
  description,
  negativeActionText = "Cancel",
  positiveActionText = "Submit",
  onOpenChange,
  onSubmit,
  children,
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={onSubmit} className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          {isPending && <PendingBar />}
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                {negativeActionText}
              </Button>
            </DialogClose>
            <Button type="submit">{positiveActionText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
