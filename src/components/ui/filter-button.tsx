"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export function FilterButton({
  children,
  isActive,
  ...props
}: {
  children: React.ReactNode;
  isActive: boolean;
} & React.ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "border-muted-foreground h-0 rounded-2xl bg-transparent px-3.5 py-4 font-normal",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary font-bold":
            isActive,
        },
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
