import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PendingBar } from "@/components/ui/pending-bar";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { changePassword } from "@/lib/actions/auth";
import { FormDialog } from "@/components/form-dialog";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function NewPasswordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Reset error state on unmount
  useEffect(() => () => setError(null), []);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await changePassword({
          password: formData.get("password") as string,
          passwordConfirmation: formData.get("password-confirmation") as string,
        });
      } catch (error) {
        if (isRedirectError(error)) {
          // Close current dialog
          setIsOpen(false);

          // Show success message
          toast("Password has been updated", {
            description: "You can now sign in with your new password.",
          });

          throw error;
        }
        setError((error as Error).message);
      }
    });
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      title="Set your new password"
      description="Enter the new password you want to use"
      positiveActionText="Submit"
      onSubmit={onSubmit}
    >
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your new password"
            type="password"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password-confirmation">Confirm password</Label>
          <Input
            id="password-confirmation"
            name="password-confirmation"
            placeholder="Confirm your new password"
            type="password"
            required
          />
          {isPending && <PendingBar />}
          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </div>
      </div>
    </FormDialog>
  );
}
