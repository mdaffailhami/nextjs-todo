export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center px-3 md:px-0">
      <h1 className="text-primary mb-4 text-center text-3xl font-semibold">
        Welcome to NextJS Todo
      </h1>
      {children}
    </main>
  );
}
