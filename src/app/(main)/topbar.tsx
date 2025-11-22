import { Button } from "@/components/ui/button";
import { verifySession } from "@/lib/utils/server";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export async function Topbar() {
  return (
    <nav className="bg-background fixed flex h-18 w-full flex-row items-center justify-between border-b-2 px-2 md:px-4">
      <section>
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
      </section>
      <section className="flex flex-row items-center gap-x-2">
        <Suspense fallback={<p>...</p>}>
          <UserEmail />
        </Suspense>
        <Button
          variant={"ghost"}
          size={"icon-lg"}
          className="text-primary hover:text-primary rounded-full"
          asChild
        >
          <Link href={"/signout"}>
            <LogOut className="size-[65%]" />
          </Link>
        </Button>
      </section>
    </nav>
  );
}

async function UserEmail() {
  const session = await verifySession();

  return (
    <>
      <User />
      <span className="font-medium italic">{session.email}</span>
    </>
  );
}
