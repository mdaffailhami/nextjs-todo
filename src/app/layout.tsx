import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeSwitcher } from "@/app/theme-switcher";
import { ThemeProvider } from "next-themes";
import { TodosProvider } from "@/contexts/todos";
import { APP_TITLE, APP_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
};

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
};
