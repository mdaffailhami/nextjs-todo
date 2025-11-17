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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Link } from "@/components/ui/link";
import { useState, useTransition } from "react";
import { AlertCircleIcon } from "lucide-react";
import { PendingBar } from "@/components/ui/pending-bar";
import { RequestCodeDialog } from "./request-code-dialog";
import { signIn } from "../actions";

export default function SigninPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRequestCodeDialogOpen, setIsRequestCodeDialogOpen] = useState(false);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const { error } = await signIn({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      setError(error);
    });
  };

  return (
    <>
      <form action={onSubmit} className="mx-auto flex w-full justify-center">
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
            {isPending && <PendingBar />}
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <p className="text-muted-foreground">
              {"Doesn't"} have one yet? <Link href="/signup">Create here</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
      <RequestCodeDialog
        isOpen={isRequestCodeDialogOpen}
        setIsOpen={setIsRequestCodeDialogOpen}
      />
    </>
  );
}
