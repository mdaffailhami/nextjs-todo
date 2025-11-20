import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Topbar({ email }: { email: string }) {
  return (
    <nav className="bg-background fixed flex h-18 w-full flex-row items-center justify-between border-b-2 px-2 md:px-4">
      <section>
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
      </section>
      <section className="flex flex-row items-center gap-x-4">
        <span className="font-medium italic">{email}</span>
        <Button
          variant={"ghost"}
          size={"icon-lg"}
          className="rounded-full"
          asChild
        >
          <Link href={"/signout"}>
            <LogOut className="text-primary hover:text-primary size-[65%]" />
          </Link>
        </Button>
      </section>
    </nav>
  );
}
