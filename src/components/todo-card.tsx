"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Todo } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "./ui/skeleton";
import { Label } from "./ui/label";

type TodoCardProps = {
  todo: Todo;
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const TodoCard = ({
  todo,
  handleToggle,
  handleDelete,
}: TodoCardProps) => {
  return (
    <div className="bg-card flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="flex items-center gap-3 overflow-hidden">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.isCompleted}
          onCheckedChange={(_) => handleToggle(todo.id)}
        />
        <Label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-sm line-clamp-1 cursor-pointer",
            todo.isCompleted && "text-muted-foreground line-through"
          )}
        >
          {todo.name}
        </Label>
      </div>

      <Button
        variant="ghost"
        className="text-destructive hover:text-destructive"
        size="icon-lg"
        onClick={() => handleDelete(todo.id)}
      >
        <TrashIcon className="size-4.5" />
      </Button>
    </div>
  );
};

export const TodoCardSkeleton = () => {
  return (
    <div className="bg-card flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="flex items-center gap-3 overflow-hidden">
        <Skeleton className="size-5.5 rounded-full" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      <Skeleton className="size-10 rounded-full" />
    </div>
  );
};
