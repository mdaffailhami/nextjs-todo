import { cn } from "@/lib/utils";
import { Dialog as BaseDialog } from "@base-ui-components/react";

function DialogBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        "fixed inset-0",
        "bg-black/50",
        "transition-opacity duration-150",
        "data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogPopup({ className, ...props }: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Popup
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "bg-neutral-1 text-on-neutral-1",
        "w-md max-w-[calc(100vw-2rem)] rounded-lg p-6",
        "transition-all duration-150",
        "data-starting-style:scale-90 data-starting-style:opacity-0",
        "data-ending-style:scale-90 data-ending-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
  return (
    <BaseDialog.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      className={cn("text-on-neutral-2 text-sm", className)}
      {...props}
    />
  );
}

function DialogContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("py-4", className)} {...props} />;
}

function DialogActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 flex justify-end gap-2", className)} {...props} />
  );
}

const Dialog = {
  ...BaseDialog,
  Backdrop: DialogBackdrop,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
  Content: DialogContent,
  Actions: DialogActions,
};

export { Dialog };
