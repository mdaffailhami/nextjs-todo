import { checkSession } from "@/lib/utils/server";
import { DesktopTopBar } from "./layout-components/desktop-top-bar";
import { Footer } from "./layout-components/footer";
import { MobileBottomBar } from "./layout-components/mobile-bottom-bar";
import { MobileTopBar } from "./layout-components/mobile-top-bar";
import { redirect } from "next/navigation";
import { Hero } from "./layout-components/hero";
import { TaskListHeader } from "./layout-components/task-list-header";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkSession();
  if (!session) return redirect("/signin");

  return (
    <>
      <header>
        <DesktopTopBar />
        <MobileTopBar />
        {/* Invisible element to push top bar to the top */}
        <div className="h-18"></div>
      </header>
      <main className="min-h-screen space-y-4">
        <Hero />
        <TaskListHeader />
        {children}
      </main>
      <footer>
        <Footer />
        {/* Invisible element to push mobile bottom bar to the bottom */}
        <div className="h-20 md:hidden"></div>
        <MobileBottomBar />
      </footer>
    </>
  );
}
