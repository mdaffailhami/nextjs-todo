import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { requestPasswordResetEmail } from "@/lib/actions/auth";
import { FormDialog } from "@/components/form-dialog";
import { CodeVerificationDialog } from "../code-verification-dialog";

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

  // Reset error state on unmount
  useEffect(() => () => setError(null), []);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await requestPasswordResetEmail({
          email: formData.get("email") as string,
        });

        // Close current dialog
        setIsOpen(false);

        // Open code verification dialog
        setIsCodeVerificationDialogOpen(true);
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  return (
    <>
      <FormDialog
        isOpen={isOpen}
        error={error}
        isPending={isPending}
        onOpenChange={setIsOpen}
        title="Request verification code"
        description="Enter your email below, so we can send you a verification code."
        positiveActionText="Request"
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
              autoComplete="off"
              required
            />
          </div>
        </div>
      </FormDialog>
      <CodeVerificationDialog
        type="password-reset"
        isOpen={isCodeVerificationDialogOpen}
        setIsOpen={setIsCodeVerificationDialogOpen}
      />
    </>
  );
}
