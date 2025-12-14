import { TodoInput } from "./todo-input";
import { TodoList } from "./todo-list";
import { APP_TITLE, APP_DESCRIPTION } from "@/lib/constants";

export default () => {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      {/* Card */}
      <div className="bg-card flex flex-col w-full max-w-sm gap-6 rounded-xl border p-6 shadow-md">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-semibold">{APP_TITLE}</h1>
          <p className="text-sm">{APP_DESCRIPTION}</p>
        </div>

        <TodoInput />
        <TodoList />
      </div>
    </main>
  );
};
