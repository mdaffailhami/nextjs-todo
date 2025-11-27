import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import {
  verifyPasswordResetCode,
  verifySignupCode,
} from "@/app/(auth)/actions";
import { Dialog } from "@/components/dialog";
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
  const [verifyRes, verifyAction, isVerifyPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const code = formData.get("code") as string;

      if (type == "signup") {
        const response = await verifySignupCode({ code });

        if (response.isError) {
          return response;
        }

        // Close current dialog
        setIsCodeVerificationDialogOpen(false);

        // Show success message
        toast.success(response.message, {
          description: "You can now sign in with your account.",
        });

        // Redirect to signin page
        router.push("/signin");
        return response;
      } else {
        const response = await verifyPasswordResetCode({ code });

        if (response.isError) {
          return response;
        }

        // Close current dialog
        setIsCodeVerificationDialogOpen(false);

        // Open new password dialog
        setIsNewPasswordDialogOpen(true);
        return response;
      }
    },
    undefined,
  );

  return (
    <Dialog
      isOpen={isCodeVerificationDialogOpen}
      error={verifyRes?.isError ? verifyRes.message : null}
      isPending={isVerifyPending}
      onOpenChange={setIsCodeVerificationDialogOpen}
      title="Verify your code"
      description="Enter the verification code sent to your email"
      positiveActionText="Verify"
      onSubmit={verifyAction}
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
  );
}
