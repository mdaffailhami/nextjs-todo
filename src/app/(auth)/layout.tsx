export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-3xl text-primary font-semibold mb-4">
        Welcome to NextJS E-commerce
      </h1>
      {children}
    </div>
  );
}
