"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions";

export function SignOutButton() {
  return <Button onClick={async () => await signOut()}>Sign Out</Button>;
}
