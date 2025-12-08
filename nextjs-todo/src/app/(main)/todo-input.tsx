"use client";

import { useState } from "react";
import { IconButton } from "@/components/icon-button";
import { useTodos } from "@/states/todos";
import { PlusIcon } from "lucide-react";
import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils";

export function TodoInput() {
  const todos = useTodos();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      todos.add(name.trim());

      // Reset input
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Field.Root className="flex-1">
        <Field.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          render={(props) => (
            <input
              {...props}
              type="text"
              placeholder="Enter new todo.."
              className={cn(
                // Base
                "border-neutral-4 bg-neutral-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm",
                // Placeholder
                "placeholder:text-on-neutral-2",
                // Disabled
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            />
          )}
        />
      </Field.Root>

      <IconButton
        variant="filled"
        icon={PlusIcon}
        type="submit"
        disabled={!name.trim()}
      />
    </form>
  );
}
