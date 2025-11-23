"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Moon, Sun } from "lucide-react";
import { FilterButton } from "@/components/ui/filter-button";
import { usePathname, useRouter } from "next/navigation";
import { AddTaskDialog } from "./add-task-dialog";
import { useState } from "react";
import { useTheme } from "@/lib/states/theme";

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
        <div className="flex flex-row gap-x-2">
          <ThemeToggler />
          {pathname === "/" && (
            <>
              {/* Desktop button */}
              <Button
                onClick={() => setIsAddTaskDialogOpen(true)}
                className="max-md:hidden"
              >
                <CirclePlus />
                Add Task
              </Button>
              {/* Mobile button */}
              <Button
                onClick={() => setIsAddTaskDialogOpen(true)}
                className="fixed right-2.5 bottom-2.5 px-5! py-5! md:hidden"
              >
                <CirclePlus />
                Add Task
              </Button>
            </>
          )}
        </div>
      </div>
      <hr />
      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        setIsOpen={setIsAddTaskDialogOpen}
      />
    </>
  );
}

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground relative flex size-9.5 items-center justify-center rounded-md border shadow-sm transition-colors hover:cursor-pointer"
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
