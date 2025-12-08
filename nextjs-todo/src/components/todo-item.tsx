"use client";

import { TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/icon-button";
import { Todo } from "@/schema";
import { cn } from "@/lib/utils";

type TodoItemProps = {
  todo: Todo;
  onToggleTrigger: (id: string) => void;
  onDeleteTrigger: (id: string) => void;
};

export function TodoItem({
  todo,
  onToggleTrigger,
  onDeleteTrigger,
}: TodoItemProps) {
  return (
    <div className="border-neutral-3 bg-neutral-2 hover:bg-neutral-1 flex items-center justify-between gap-2 rounded-lg border p-3 shadow-sm transition-colors">
      <div className="flex items-center gap-3 overflow-hidden">
        <Checkbox
          checked={todo.isCompleted}
          onCheckedChange={() => onToggleTrigger(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "cursor-pointer truncate text-sm font-medium transition-all select-none",
            todo.isCompleted && "text-neutral-4 line-through opacity-60",
          )}
        >
          {todo.name}
        </label>
      </div>

      <IconButton
        variant="ghost"
        className="text-destructive"
        icon={TrashIcon}
        onClick={() => onDeleteTrigger(todo.id)}
      />
    </div>
  );
}
