"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { FilterButton } from "@/components/ui/filter-button";
import { usePathname, useRouter } from "next/navigation";

export function TaskListHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const categories = [
    {
      label: "Active",
      path: "/",
    },
    {
      label: "Completed",
      path: "/completed",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between">
        <h2>Your tasks</h2>
      </div>
      <div className="flex h-10 flex-row items-center">
        <div className="flex flex-1 flex-row gap-x-1.5">
          {categories.map((category, i) => (
            <FilterButton
              key={i}
              isActive={pathname === category.path}
              onClick={() => router.replace(category.path)}
            >
              {category.label}
            </FilterButton>
          ))}
        </div>
        {pathname === "/" && (
          <Button>
            <CirclePlus />
            Add Task
          </Button>
        )}
      </div>
      <hr />
    </>
  );
}
