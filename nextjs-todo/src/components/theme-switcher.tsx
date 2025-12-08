"use client";

import { EllipsisIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "./icon-button";
import { useIsHydrated } from "@/hooks/use-is-hydrated";

export function ThemeSwitcher() {
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

  return (
    <IconButton
      variant="filled"
      icon={(() => {
        if (!isHydrated) return EllipsisIcon;

        if (theme === "dark") return MoonIcon;
        if (theme === "light") return SunIcon;
        return LaptopIcon;
      })()}
      onClick={handleClick}
    />
  );
}
