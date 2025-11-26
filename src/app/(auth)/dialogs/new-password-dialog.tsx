import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { changePassword } from "@/app/(auth)/actions";
import { Dialog } from "@/components/dialog";
import { toast } from "sonner";
import { useIsNewPasswordDialogOpen } from "../states/is-new-password-dialog-open";

export function NewPasswordDialog() {
  const { isNewPasswordDialogOpen, setIsNewPasswordDialogOpen } =
    useIsNewPasswordDialogOpen();

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Reset error state on unmount
  useEffect(() => () => setError(null), []);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await changePassword({
        password: formData.get("password") as string,
        passwordConfirmation: formData.get("password-confirmation") as string,
      });

      if (response.isError) {
        setError(response.message);
        return;
      }

      // If password change success

      // Close current dialog
      setIsNewPasswordDialogOpen(false);

      // Show success message
      toast.success(response.message, {
        description: "You can now sign in with your new password.",
      });
    });
  };

  return (
    <Dialog
      isOpen={isNewPasswordDialogOpen}
      error={error}
      isPending={isPending}
      onOpenChange={setIsNewPasswordDialogOpen}
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
        </div>
      </div>
    </Dialog>
  );
}
