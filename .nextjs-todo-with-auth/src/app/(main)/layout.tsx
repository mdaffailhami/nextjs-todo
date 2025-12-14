import { Footer } from "./footer";
import { Topbar } from "./topbar";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Topbar />
        {/* Invisible element to push top bar to the top */}
        <div className="h-18"></div>
      </header>
      {children}
      <Footer />
    </>
  );
}
