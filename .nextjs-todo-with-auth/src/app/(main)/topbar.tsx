import { verifySession } from "@/lib/utils/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SignoutButton } from "./signout-button";
import { User } from "lucide-react";

export async function Topbar() {
  return (
    <nav className="bg-background fixed flex h-18 w-screen flex-row items-center justify-between border-b-2 px-2 md:px-4">
      <section>
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
      </section>
      <section className="flex flex-row items-center gap-x-2">
        <Suspense fallback={<p>...</p>}>
          <UserEmailSection />
        </Suspense>
        <SignoutButton />
      </section>
    </nav>
  );
}

async function UserEmailSection() {
  const session = await verifySession();

  return (
    <>
      <User />
      <span className="font-medium italic">{session.email}</span>
    </>
  );
}
