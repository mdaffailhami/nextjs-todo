"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Link } from "@/components/ui/link";
import { useActionState } from "react";
import { AlertCircleIcon } from "lucide-react";
import { PendingBar } from "@/components/ui/pending-bar";
import { signIn } from "@/app/(auth)/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RequestCodeDialog } from "../dialogs/request-code-dialog";
import { useIsRequestCodeDialogOpen } from "../states/is-request-code-dialog-open";
import { CodeVerificationDialog } from "../dialogs/code-verification-dialog";
import { NewPasswordDialog } from "../dialogs/new-password-dialog";

export default function SigninPage() {
  const { setIsRequestCodeDialogOpen } = useIsRequestCodeDialogOpen();

  const router = useRouter();

  const [signInRes, signInAction, isSignInPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const response = await signIn({ email, password });

      if (response.isError) return response;

      toast.success(response.message, {
        description: `Successfully signed in as ${email}`,
      });

      router.push("/");
      return response;
    },
    undefined,
  );

  return (
    <>
      <RequestCodeDialog />
      <CodeVerificationDialog type="password-reset" />
      <NewPasswordDialog />
      <form
        action={signInAction}
        className="mx-auto flex w-full justify-center"
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-primary text-center text-2xl">
              Sign-in to your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
                <p className="text-muted-foreground ml-auto">
                  Forgot your password?{" "}
                  <Button
                    variant="link"
                    size={"plain"}
                    type="button"
                    onClick={() => setIsRequestCodeDialogOpen(true)}
                  >
                    reset
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            {isSignInPending && <PendingBar />}
            {signInRes?.isError && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{signInRes.message}</AlertTitle>
              </Alert>
            )}
            <p className="text-muted-foreground">
              {"Doesn't"} have one yet? <Link href="/signup">Create here</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
