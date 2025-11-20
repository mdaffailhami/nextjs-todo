import { Button } from "@/components/ui/button";
import { Search, SearchIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MobileTopBar() {
  return (
    <nav className="bg-background fixed flex h-18 w-full flex-row items-center justify-between border-b-2 px-2 md:hidden">
      <section>
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
      </section>
      <section className="flex flex-row items-center gap-x-4">
        <Button variant={"ghost"} size={"icon-lg"} className="rounded-full">
          <Search className="text-primary hover:text-primary size-[65%]" />
        </Button>
      </section>
    </nav>
  );
}
