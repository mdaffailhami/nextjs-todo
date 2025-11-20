import { Footer } from "./layout-components/footer";
import { Topbar } from "./layout-components/topbar";
import { Hero } from "./layout-components/hero";
import { TaskListHeader } from "./layout-components/task-list-header";

export default async function AuthLayout({
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
      <main className="min-h-screen space-y-8">
        <Hero />
        <div className="mx-auto flex max-w-180 flex-col gap-y-3">
          <TaskListHeader />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
