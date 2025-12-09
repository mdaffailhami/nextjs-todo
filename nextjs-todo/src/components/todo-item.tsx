"use client";

import { PencilIcon, TrashIcon, XIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Todo } from "@/schema";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { PrimaryButton } from "./ui/primary-button";

type TodoItemProps = {
  todo: Todo;
  onToggleTrigger: (id: string) => void;
  onEditTrigger: (id: string) => void;
  onDeleteTrigger: (id: string) => void;
};

export function TodoItem({
  todo,
  onToggleTrigger,
  onEditTrigger,
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

      <div className="flex flex-row">
        <Dialog.Root>
          <Dialog.Trigger
            render={(props) => (
              <IconButton
                variant="ghost"
                className="text-primary"
                icon={PencilIcon}
                // onClick={() => {}}
                {...props}
              />
            )}
          />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Edit Todo</Dialog.Title>
              <Dialog.Description>Edit the todo name</Dialog.Description>
              <Dialog.Content>
                <h1>aowkkwkw</h1>
              </Dialog.Content>
              <Dialog.Actions>
                <Dialog.Close
                  render={(props) => (
                    <PrimaryButton
                      variant="outlined"
                      // className=""
                      {...props}
                    >
                      Cancel
                    </PrimaryButton>
                  )}
                />
                <PrimaryButton variant="filled">Save</PrimaryButton>
              </Dialog.Actions>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <IconButton
          variant="ghost"
          className="text-destructive"
          icon={TrashIcon}
          onClick={() => onDeleteTrigger(todo.id)}
        />
      </div>
    </div>
  );
}
