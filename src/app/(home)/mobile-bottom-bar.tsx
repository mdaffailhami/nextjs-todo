"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navs = [
  {
    Icon: Home,
    label: "Home",
    path: "/",
  },
  {
    Icon: User,
    label: "Profile",
    path: "/profile",
  },
];

export function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background fixed bottom-0 flex h-20 w-full flex-row items-center border-t-2 md:hidden">
      {navs.map(({ Icon, label, path }, i) => (
        <Button
          key={i}
          variant={"ghost"}
          className={cn(
            "text-muted-foreground hover:text-primary flex h-full flex-1 flex-col gap-y-2",
            {
              "text-primary": pathname === path,
            },
          )}
          asChild
        >
          <Link href={path}>
            <Icon className="size-6" />
            <span>{label}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}
