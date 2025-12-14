"use client";

import { EllipsisIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useIsHydrated } from "@/hooks";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const Icon = (() => {
    // If it's not hydrated yet
    if (!isHydrated) return EllipsisIcon;

    if (theme === "dark") return MoonIcon;
    if (theme === "light") return SunIcon;
    return LaptopIcon;
  })();

  return (
    <Button
      disabled={!isHydrated}
      variant="default"
      size="icon-lg"
      onClick={handleClick}
      className="fixed right-2 top-2 rounded-md"
    >
      <Icon className="size-5" />
    </Button>
  );
};
