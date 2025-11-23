"use client";

import { useTheme } from "@/lib/states/theme";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

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
