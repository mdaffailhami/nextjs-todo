"use client";
import { createContext, useState, use, useLayoutEffect } from "react";

export type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: ThemeContextType["theme"]) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const theme = use(ThemeContext);
  if (!theme) throw new Error("useTheme must be used within a ThemeProvider");
  return theme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme from localStorage using lazy initializer
  const [theme, setTheme] = useState<ThemeContextType["theme"] | null>(null);

  useLayoutEffect(() => {
    // If first render
    if (!theme) {
      const storedTheme = window.localStorage.getItem("theme");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: setting initial theme from localStorage on first render to prevent flash
      setTheme(storedTheme === "dark" ? "dark" : "light");
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme || "light");
  }, [theme]);

  // Prevent page flash when the page loads
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
