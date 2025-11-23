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
  const [theme, setTheme] = useState<ThemeContextType["theme"] | null>(null);

  useLayoutEffect(() => {
    console.log("1");
    const storedTheme = window.localStorage.getItem("theme");

    setTheme(storedTheme === "dark" ? "dark" : "light");
  }, []);

  useLayoutEffect(() => {
    console.log("2");
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme || "light");
  }, [theme]);

  // Prevent flash when page load
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
