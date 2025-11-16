import { checkSession } from "@/lib/utils/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkSession();
  if (session) return redirect("/");

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-primary mb-4 text-center text-3xl font-semibold">
        Welcome to NextJS E-commerce
      </h1>
      {children}
    </div>
  );
}
