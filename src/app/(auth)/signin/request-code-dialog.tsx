import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PendingBar } from "@/components/ui/pending-bar";
import { AlertCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { sendPasswordResetEmail } from "../actions";
import { FormDialog } from "@/components/form-dialog";
import { CodeVerificationDialog } from "./code-verification-dialog";

export function RequestCodeDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isCodeVerificationDialogOpen, setIsCodeVerificationDialogOpen] =
    useState(false);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const { error } = await sendPasswordResetEmail({
        email: formData.get("email") as string,
      });

      setError(error);

      if (!error) {
        setIsOpen(false);
        setIsCodeVerificationDialogOpen(true);
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
            setIsCodeVerificationDialogOpen(false);
          }
        }}
        title="Request verification code"
        description="Enter your email below, so we can send you a verification code."
        onSubmit={onSubmit}
      >
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
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
      <CodeVerificationDialog
        isOpen={isCodeVerificationDialogOpen}
        setIsOpen={setIsCodeVerificationDialogOpen}
      />
    </>
  );
}
