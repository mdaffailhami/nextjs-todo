import { TodoInput } from "@/app/(main)/todo-input";
import { TodoList } from "@/app/(main)/todo-list";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-3 px-2">
      {/* Card */}
      <div className="border-neutral-3 bg-neutral-2 flex w-full max-w-sm flex-col gap-6 rounded-xl border p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-semibold">NextJS Todo</h1>
          <p className="text-sm">A simple todo list built with NextJS.</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <TodoInput />
          <TodoList />
        </div>
      </div>

      <ThemeSwitcher />
    </main>
  );
}
