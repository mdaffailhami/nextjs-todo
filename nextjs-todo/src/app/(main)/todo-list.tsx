"use client";

import { TodoItem } from "@/components/todo-item";
import { useTodos } from "@/states/todos";

export function TodoList() {
  const todos = useTodos();

  // If there is no todo
  if (todos.value.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-sm">
        <p>No todos yet.</p>
        <p>Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.value.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTrigger={(id) => todos.toggleCompletion(id)}
          onEditTrigger={(id) => {}}
          onDeleteTrigger={(id) => todos.delete(id)}
        />
      ))}
    </div>
  );
}
