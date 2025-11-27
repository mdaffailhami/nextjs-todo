import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { changePassword } from "@/app/(auth)/actions";
import { Dialog } from "@/components/dialog";
import { toast } from "sonner";
import { useIsNewPasswordDialogOpen } from "../states/is-new-password-dialog-open";

export function NewPasswordDialog() {
  const { isNewPasswordDialogOpen, setIsNewPasswordDialogOpen } =
    useIsNewPasswordDialogOpen();

  const [changeRes, changeAction, isChangePending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const password = formData.get("password") as string;
      const passwordConfirmation = formData.get(
        "password-confirmation",
      ) as string;

      const response = await changePassword({
        password,
        passwordConfirmation,
      });

      if (response.isError) {
        return response;
      }

      // Close current dialog
      setIsNewPasswordDialogOpen(false);

      // Show success message
      toast.success(response.message, {
        description: "You can now sign in with your new password.",
      });
      return response;
    },
    undefined,
  );

  return (
    <Dialog
      isOpen={isNewPasswordDialogOpen}
      error={changeRes?.isError ? changeRes.message : null}
      isPending={isChangePending}
      onOpenChange={setIsNewPasswordDialogOpen}
      title="Set your new password"
      description="Enter the new password you want to use"
      positiveActionText="Submit"
      onSubmit={changeAction}
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
