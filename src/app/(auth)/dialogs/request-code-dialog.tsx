import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { requestPasswordResetEmail } from "@/app/(auth)/actions";
import { Dialog } from "@/components/dialog";
import { useIsRequestCodeDialogOpen } from "../states/is-request-code-dialog-open";
import { CodeVerificationDialog } from "./code-verification-dialog";
import { useIsCodeVerificationDialogOpen } from "../states/is-code-verification-dialog-open";

export function RequestCodeDialog() {
  const { isRequestCodeDialogOpen, setIsRequestCodeDialogOpen } =
    useIsRequestCodeDialogOpen();

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { setIsCodeVerificationDialogOpen } = useIsCodeVerificationDialogOpen();

  // Reset error state on unmount
  useEffect(() => () => setError(null), []);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await requestPasswordResetEmail({
        email: formData.get("email") as string,
      });

      if (response.isError) {
        setError(response.message);
        return;
      }

      // Close current dialog
      setIsRequestCodeDialogOpen(false);

      // Open code verification dialog
      setIsCodeVerificationDialogOpen(true);
    });
  };

  return (
    <>
      <CodeVerificationDialog type="password-reset" />
      <Dialog
        isOpen={isRequestCodeDialogOpen}
        error={error}
        isPending={isPending}
        onOpenChange={setIsRequestCodeDialogOpen}
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
      </Dialog>
    </>
  );
}
