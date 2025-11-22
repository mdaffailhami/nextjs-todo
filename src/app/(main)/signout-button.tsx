"use client";

import { Dialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function SignoutButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        await signOut();
      } catch (error) {
        // If signout success
        if (isRedirectError(error)) {
          setIsDialogOpen(false);

          toast.success("You have been signed out", {
            description: "Thank you for using our service.",
          });
          throw error;
        }
        setError((error as Error).message);
      }
    });
  };

  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon-lg"}
        className="text-destructive hover:text-destructive rounded-full"
        onClick={() => setIsDialogOpen(true)}
      >
        <LogOut className="size-[65%]" />
      </Button>
      <Dialog
        type="destructive"
        isOpen={isDialogOpen}
        error={error}
        isPending={isPending}
        onOpenChange={setIsDialogOpen}
        title="Sign out"
        description="Are you sure you want to sign out?"
        positiveActionText="Sign Out"
        onSubmit={onSubmit}
      />
    </>
  );
}
