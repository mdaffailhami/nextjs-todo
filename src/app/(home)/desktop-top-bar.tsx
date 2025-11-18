import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar } from "@radix-ui/react-avatar";
import { SearchIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DesktopTopBar() {
  return (
    <nav className="bg-background fixed hidden h-18 w-full flex-row items-center justify-between border-b-2 md:flex md:px-5 lg:px-10">
      <section>
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
      </section>
      <section className="w-full max-w-120">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </section>
      <section className="flex flex-row items-center gap-x-4">
        <Button variant={"ghost"} size={"icon-lg"} className="rounded-full">
          <ShoppingCart className="text-primary hover:text-primary size-[65%]" />
        </Button>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="hover:outline-primary size-9 rounded-full transition-colors hover:cursor-pointer hover:outline-2"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </section>
    </nav>
  );
}
