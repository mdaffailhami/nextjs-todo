"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { useState, useTransition } from "react";
import { signUp } from "../actions";
import { PendingBar } from "@/components/ui/pending-bar";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CodeVerificationDialog } from "../code-verification-dialog";

export default function SigninPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isCodeVerificationDialogOpen, setIsCodeVerificationDialogOpen] =
    useState(false);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const { error } = await signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        passwordConfirmation: formData.get("password-confirmation") as string,
      });

      setError(error);

      if (!error) {
        setIsCodeVerificationDialogOpen(true);
      }
    });
  };

  return (
    <>
      <form action={onSubmit} className="mx-auto flex w-full justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-primary text-center text-2xl">
              Create your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create your password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password-confirmation">Confirm password</Label>
                <Input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            {isPending && <PendingBar />}
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <p className="text-muted-foreground">
              Already have one? <Link href="/signin">Sign-in here</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
      <CodeVerificationDialog
        type="signup"
        isOpen={isCodeVerificationDialogOpen}
        setIsOpen={setIsCodeVerificationDialogOpen}
      />
    </>
  );
}
