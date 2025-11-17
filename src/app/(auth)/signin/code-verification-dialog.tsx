import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PendingBar } from "@/components/ui/pending-bar";
import { AlertCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { verifyPasswordResetCode } from "../actions";
import { FormDialog } from "@/components/form-dialog";
import { NewPasswordDialog } from "./new-password-dialog";

export function CodeVerificationDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isNewPasswordDialogOpen, setIsNewPasswordDialogOpen] = useState(false);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const { error } = await verifyPasswordResetCode({
        code: formData.get("code") as string,
      });

      setError(error);

      if (!error) {
        setIsOpen(false);
        setIsNewPasswordDialogOpen(true);
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
      <NewPasswordDialog
        isOpen={isNewPasswordDialogOpen}
        setIsOpen={setIsNewPasswordDialogOpen}
      />
    </>
  );
}
