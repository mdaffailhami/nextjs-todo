import { ThemeToggler } from "@/components/theme-toggler";
import AuthProviders from "./providers";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProviders>
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-y-4 px-3 md:px-0">
        <h1 className="text-primary text-center text-3xl font-semibold">
          Welcome to NextJS Todo
        </h1>
        {children}
        <ThemeToggler />
      </main>
    </AuthProviders>
  );
}
