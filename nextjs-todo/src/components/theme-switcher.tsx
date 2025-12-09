"use client";

import { EllipsisIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "@/components/ui/icon-button";
import { useIsHydrated } from "@/hooks";

export const ThemeSwitcher = ({ className }: { className?: string }) => {
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
      className={className}
      disabled={!isHydrated}
      variant="filled"
      icon={(() => {
        // If it's not hydrated yet
        if (!isHydrated) return EllipsisIcon;

        if (theme === "dark") return MoonIcon;
        if (theme === "light") return SunIcon;
        return LaptopIcon;
      })()}
      onClick={handleClick}
    />
  );
};
