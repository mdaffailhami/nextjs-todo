"use client";

import { cn } from "@/lib/utils";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-md border hover:cursor-pointer hover:opacity-70"
    >
      {isHydrated && (
        <>
          <SunIcon
            className={cn(
              "absolute size-5 transition-transform",
              theme === "light" ? "scale-100 rotate-0" : "scale-0 -rotate-90",
            )}
          />
          <LaptopIcon
            className={cn(
              "absolute size-5 transition-transform",
              theme === "system" ? "scale-100 rotate-0" : "scale-0 rotate-90",
            )}
          />
          <MoonIcon
            className={cn(
              "absolute size-5 transition-transform",
              theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90",
            )}
          />
        </>
      )}
    </Button>
  );
}
