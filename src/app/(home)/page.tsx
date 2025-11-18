import { checkSession } from "@/lib/utils/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";

export default async function HomePage() {
  const session = await checkSession();
  if (!session) return redirect("/signin");

  return (
    <div className="h-999">
      <h1>Home Page</h1>
      <SignOutButton />
    </div>
  );
}
