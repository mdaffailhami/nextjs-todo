"use client";

import { TrashIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Todo } from "@/schema";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="border-neutral-3 bg-neutral-2 flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all">
      <div className="flex items-center gap-3 overflow-hidden">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.isCompleted}
          onCheckedChange={(_) => onToggleTrigger(todo.id)}
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
