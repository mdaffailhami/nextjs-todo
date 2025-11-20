import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PendingBar } from "@/components/ui/pending-bar";
import { AlertCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { verifyPasswordResetCode, verifySignupCode } from "./actions";
import { FormDialog } from "@/components/form-dialog";
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

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      let error;
      if (type == "signup") {
        const res = await verifySignupCode({
          code: formData.get("code") as string,
        });

        error = res.error;
      } else {
        const res = await verifyPasswordResetCode({
          code: formData.get("code") as string,
        });

        error = res.error;
      }

      setError(error);

      if (!error) {
        setIsOpen(false);

        // Open new password dialog if the type is password reset
        if (type == "password-reset") setIsNewPasswordDialogOpen(true);
        // Show success message if the type is signup
        else {
          // Show success message
          toast("Account created successfully", {
            description: "You can now sign in with your account.",
          });

          // Push to signin page
          router.push("/signin");
        }
      }
    });
  };

  return (
    <>
      <FormDialog
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);

          // Reset state if the dialog is closed
          if (!isOpen) {
            setError(null);
            setIsNewPasswordDialogOpen(false);
          }
        }}
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
      {type == "password-reset" && (
        <NewPasswordDialog
          isOpen={isNewPasswordDialogOpen}
          setIsOpen={setIsNewPasswordDialogOpen}
        />
      )}
    </>
  );
}
