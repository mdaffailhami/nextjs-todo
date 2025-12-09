import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import { TodosProvider } from "@/states/todos";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Todo",
  description: "A simple todo list built with NextJS.",
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
          <ThemeSwitcher className="fixed right-3 bottom-3" />
        </Providers>
      </body>
    </html>
  );
};
