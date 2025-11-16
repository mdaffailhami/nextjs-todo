import { Button } from "@/components/ui/button";
import { checkSession, signOut } from "@/lib/utils/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await checkSession();
  if (!session) return redirect("/signin");

  return (
    <>
      <h1>Home Page</h1>
      <Button asChild>
        <Link href="/signout">Sign out</Link>
      </Button>
    </>
  );
}
