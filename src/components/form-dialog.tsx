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

type FormDialogProps = {
  isOpen: boolean;
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
  title,
  description,
  negativeActionText = "Cancel",
  positiveActionText = "Send",
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
