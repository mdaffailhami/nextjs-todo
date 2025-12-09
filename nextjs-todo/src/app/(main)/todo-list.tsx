"use client";

import { TodoCard, TodoCardSkeleton } from "@/components/todo-card";
import { useTodos } from "@/states/todos";

export const TodoList = () => {
  const todos = useTodos();

  if (!todos.isLoaded) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <TodoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If there is no todo
  if (todos.value.length === 0) {
    return (
      <div className="text-on-neutral-2 border-neutral-4 flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-sm">
        <p>No todos yet.</p>
        <p>Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.value.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleTrigger={(id) => todos.toggleCompletion(id)}
          onDeleteTrigger={(id) => todos.delete(id)}
        />
      ))}
    </div>
  );
};
