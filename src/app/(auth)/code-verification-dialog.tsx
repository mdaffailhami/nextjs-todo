import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { verifyPasswordResetCode, verifySignupCode } from "@/lib/actions/auth";
import { Dialog } from "@/components/dialog";
import { NewPasswordDialog } from "./signin/new-password-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Renders a dialog for users to verify a code, either for password reset or signup.
 */
export function CodeVerificationDialog({
  type,
  isOpen,
  setIsOpen,
}: {
  type: "password-reset" | "signup";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isNewPasswordDialogOpen, setIsNewPasswordDialogOpen] = useState(false);

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
        setIsOpen(false);

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
          setIsOpen(false);

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
      <Dialog
        isOpen={isOpen}
        error={error}
        isPending={isPending}
        onOpenChange={setIsOpen}
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
      {type == "password-reset" && (
        <NewPasswordDialog
          isOpen={isNewPasswordDialogOpen}
          setIsOpen={setIsNewPasswordDialogOpen}
        />
      )}
    </>
  );
}
