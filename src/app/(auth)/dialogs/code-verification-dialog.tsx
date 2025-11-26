import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { verifyPasswordResetCode, verifySignupCode } from "@/lib/actions/auth";
import { Dialog } from "@/components/dialog";
import { NewPasswordDialog } from "./new-password-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useIsCodeVerificationDialogOpen } from "../states/is-code-verification-dialog-open";
import { useIsNewPasswordDialogOpen } from "../states/is-new-password-dialog-open";

/**
 * Renders a dialog for users to verify a code, either for password reset or signup.
 */
export function CodeVerificationDialog({
  type,
}: {
  type: "password-reset" | "signup";
}) {
  const { isCodeVerificationDialogOpen, setIsCodeVerificationDialogOpen } =
    useIsCodeVerificationDialogOpen();
  const { setIsNewPasswordDialogOpen } = useIsNewPasswordDialogOpen();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Reset error state on unmount
  useEffect(() => () => setError(null), []);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (type == "signup") {
        try {
          await verifySignupCode({
            code: formData.get("code") as string,
          });
        } catch (error) {
          setError((error as Error).message);
        }

        // If signup success

        // Close current dialog
        setIsCodeVerificationDialogOpen(false);

        // Show success message
        toast.success("Account created successfully", {
          description: "You can now sign in with your account.",
        });

        // Redirect to signin page
        router.push("/signin");
      } else {
        try {
          // Verify code
          await verifyPasswordResetCode({
            code: formData.get("code") as string,
          });

          // Close current dialog
          setIsCodeVerificationDialogOpen(false);

          // Open new password dialog
          setIsNewPasswordDialogOpen(true);
        } catch (error) {
          setError((error as Error).message);
        }
      }
    });
  };

  return (
    <>
      {type == "password-reset" && <NewPasswordDialog />}
      <Dialog
        isOpen={isCodeVerificationDialogOpen}
        error={error}
        isPending={isPending}
        onOpenChange={setIsCodeVerificationDialogOpen}
        title="Verify your code"
        description="Enter the verification code sent to your email"
        positiveActionText="Verify"
        onSubmit={onSubmit}
      >
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              name="code"
              placeholder="Enter your verification code"
              type="text"
              autoComplete="off"
              required
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
