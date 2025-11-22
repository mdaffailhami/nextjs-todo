"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { FilterButton } from "@/components/ui/filter-button";
import { usePathname, useRouter } from "next/navigation";
import { AddTaskDialog } from "./add-task-dialog";
import { useState } from "react";

export function TaskListHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

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
          <Button onClick={() => setIsAddTaskDialogOpen(true)}>
            <CirclePlus />
            Add Task
          </Button>
        )}
      </div>
      <hr />
      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        setIsOpen={setIsAddTaskDialogOpen}
      />
    </>
  );
}
