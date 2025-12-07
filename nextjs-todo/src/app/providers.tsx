import { ThemeProvider } from "next-themes";
import { TodosProvider } from "@/states/todos";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
}
