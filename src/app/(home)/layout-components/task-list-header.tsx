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
    <div className="mx-auto flex max-w-180 flex-col gap-y-2.5">
      <div className="flex flex-row justify-between">
        <h2>Your tasks</h2>
        <Button>
          <CirclePlus />
          Add Task
        </Button>
      </div>
      <div className="flex flex-row gap-x-1.5">
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
      <hr />
    </div>
  );
}
