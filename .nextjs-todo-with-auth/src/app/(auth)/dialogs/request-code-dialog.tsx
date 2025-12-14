import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { requestPasswordResetEmail } from "@/app/(auth)/actions";
import { Dialog } from "@/components/dialog";
import { useIsRequestCodeDialogOpen } from "../states/is-request-code-dialog-open";
import { useIsCodeVerificationDialogOpen } from "../states/is-code-verification-dialog-open";

export function RequestCodeDialog() {
  const { isRequestCodeDialogOpen, setIsRequestCodeDialogOpen } =
    useIsRequestCodeDialogOpen();
  const { setIsCodeVerificationDialogOpen } = useIsCodeVerificationDialogOpen();

  const [requestRes, requestAction, isRequestPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const email = formData.get("email") as string;

      const response = await requestPasswordResetEmail({ email });

      if (response.isError) {
        return response;
      }

      // Close current dialog
      setIsRequestCodeDialogOpen(false);

      // Open code verification dialog
      setIsCodeVerificationDialogOpen(true);
      return response;
    },
    undefined,
  );

  return (
    <Dialog
      isOpen={isRequestCodeDialogOpen}
      error={requestRes?.isError ? requestRes.message : null}
      isPending={isRequestPending}
      onOpenChange={setIsRequestCodeDialogOpen}
      title="Request verification code"
      description="Enter your email below, so we can send you a verification code."
      positiveActionText="Request"
      onSubmit={requestAction}
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
  );
}
