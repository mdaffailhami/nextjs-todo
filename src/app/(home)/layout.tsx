import { DesktopTopBar } from "./desktop-top-bar";
import { MobileBottomBar } from "./mobile-bottom-bar";
import { MobileTopBar } from "./mobile-top-bar";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <DesktopTopBar />
        <MobileTopBar />
        <MobileBottomBar />
        <div className="h-18"></div>
      </header>
      <main className="">{children}</main>
    </>
  );
}
