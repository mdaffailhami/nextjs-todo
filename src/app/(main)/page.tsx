import { TodoInput } from "./todo-input";
import { TodoList } from "./todo-list";
import { metadata } from "@/lib/constants";

export default () => {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      {/* Card */}
      <div className="bg-card flex flex-col w-full max-w-sm gap-6 rounded-xl border p-6 shadow-md">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-semibold">
            {metadata.title as string}
          </h1>
          <p className="text-sm">{metadata.description}</p>
        </div>

        <TodoInput />
        <TodoList />
      </div>
    </main>
  );
};
