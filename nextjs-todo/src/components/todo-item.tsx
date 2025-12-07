"use client";

import { Trash2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
    <div className="hover:bg-muted/50 flex items-center justify-between gap-2 rounded-lg border p-3 shadow-sm transition-colors">
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
            todo.isCompleted &&
              "text-muted-foreground decoration-muted-foreground/50 line-through",
          )}
        >
          {todo.name}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-destructive rounded-full"
        onClick={() => onDeleteTrigger(todo.id)}
      >
        <Trash2Icon className="size-4" />
        <span className="sr-only">Delete Todo</span>
      </Button>
    </div>
  );
}
