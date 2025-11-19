import { DesktopTopBar } from "./desktop-top-bar";
import { Footer } from "./footer";
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
        {/* Invisible element to push top bar to the top */}
        <div className="h-18"></div>
      </header>
      <main className="">{children}</main>
      <footer>
        <Footer />
        {/* Invisible element to push mobile bottom bar to the bottom */}
        <div className="h-20 md:hidden"></div>
        <MobileBottomBar />
      </footer>
    </>
  );
}
