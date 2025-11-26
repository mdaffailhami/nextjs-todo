import { ThemeProvider } from "./states/theme";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
