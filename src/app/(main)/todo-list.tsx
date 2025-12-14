"use client";

import { TodoCard, TodoCardSkeleton } from "@/components/todo-card";
import { useTodos } from "@/contexts/todos";

export const TodoList = () => {
  const { todos, isLoaded, toggleTodo, deleteTodo } = useTodos();

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <TodoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If there is no todo
  if (todos.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-sm">
        <p>No todos yet.</p>
        <p>Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          handleToggle={(id) => toggleTodo(id)}
          handleDelete={(id) => deleteTodo(id)}
        />
      ))}
    </div>
  );
};
