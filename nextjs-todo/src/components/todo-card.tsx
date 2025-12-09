"use client";

import { TrashIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Todo } from "@/schema";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "./ui/skeleton";

type TodoCardProps = {
  todo: Todo;
  onToggleTrigger: (id: string) => void;
  onDeleteTrigger: (id: string) => void;
};

export function TodoCard({
  todo,
  onToggleTrigger,
  onDeleteTrigger,
}: TodoCardProps) {
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

export function TodoCardSkeleton() {
  return (
    <div className="border-neutral-3 bg-neutral-2 flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all">
      <div className="flex items-center gap-3 overflow-hidden">
        <Skeleton className="size-5.5 rounded-full" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      <Skeleton className="size-10 rounded-full" />
    </div>
  );
}
