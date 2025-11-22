import { Hero } from "./hero";
import { TaskListHeader } from "./task-list-header";

export default async function TaskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mb-14 min-h-screen space-y-8">
      <Hero />
      <div className="mx-auto flex max-w-180 flex-col gap-y-3">
        <TaskListHeader />
        {children}
      </div>
    </main>
  );
}
