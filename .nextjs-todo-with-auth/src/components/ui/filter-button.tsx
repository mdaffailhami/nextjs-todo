"use client";

import { cn } from "@/lib/utils";

export function FilterButton({
  children,
  isActive,
  ...props
}: {
  children: React.ReactNode;
  isActive: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "border-border hover:bg-primary/10 flex h-0 items-center rounded-2xl border-2 bg-transparent px-3.5 py-4 font-normal hover:cursor-pointer",
        {
          "bg-primary text-primary-foreground hover:bg-primary/70 hover:text-primary-foreground border-primary hover:border-primary/10 font-bold":
            isActive,
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
}
