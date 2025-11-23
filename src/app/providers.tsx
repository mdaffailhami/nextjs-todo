import { ThemeContextType, ThemeProvider } from "@/lib/states/theme";
import { cookies as nextCookies } from "next/headers";

export async function Providers({ children }: { children: React.ReactNode }) {
  const cookies = await nextCookies();

  const theme: ThemeContextType["theme"] =
    cookies.get("theme")?.value === "dark" ? "dark" : "light";

  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
}
