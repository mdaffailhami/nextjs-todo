"use client";

import { Dialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/(auth)/actions";
import { LogOut } from "lucide-react";
import { useState, useActionState } from "react";
import { toast } from "sonner";

export function SignoutButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [signOutRes, signOutAction, isSignOutPending] = useActionState(
    async () => {
      const response = await signOut();

      if (response.isError) {
        return response;
      }

      // If signout success
      setIsDialogOpen(false);

      toast.success(response.message, {
        description: "Thank you for using our service.",
      });
      return response;
    },
    undefined,
  );

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
        error={signOutRes?.isError ? signOutRes.message : null}
        isPending={isSignOutPending}
        onOpenChange={setIsDialogOpen}
        title="Sign out"
        description="Are you sure you want to sign out?"
        positiveActionText="Sign Out"
        onSubmit={signOutAction}
      />
    </>
  );
}
