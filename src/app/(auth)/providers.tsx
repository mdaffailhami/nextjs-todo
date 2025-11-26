import { IsCodeVerificationDialogOpenProvider } from "./states/is-code-verification-dialog-open";
import { IsNewPasswordDialogOpenProvider } from "./states/is-new-password-dialog-open";
import { IsRequestCodeDialogOpenProvider } from "./states/is-request-code-dialog-open";

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsRequestCodeDialogOpenProvider>
      <IsCodeVerificationDialogOpenProvider>
        <IsNewPasswordDialogOpenProvider>
          {children}
        </IsNewPasswordDialogOpenProvider>
      </IsCodeVerificationDialogOpenProvider>
    </IsRequestCodeDialogOpenProvider>
  );
}
