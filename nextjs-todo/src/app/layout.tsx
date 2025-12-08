import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootProviders } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Todo",
  description: "A simple todo list built with NextJS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="bg-neutral-1 text-on-neutral-1 border-neutral-4 min-h-screen font-sans antialiased transition-colors">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
