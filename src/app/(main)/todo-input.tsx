"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/contexts/todos";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const TodoInput = () => {
  const { addTodo } = useTodos();
  const [name, setName] = useState("");
  const trimmedName = name.trim(); // Trim whitespaces

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If trimmed name is empty, return
    if (!trimmedName) return;

    // Add todo
    addTodo(trimmedName);

    // Reset input
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Enter new todo.."
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        variant="default"
        size="icon-lg"
        type="submit"
        disabled={!trimmedName}
      >
        <PlusIcon className="size-5" />
      </Button>
    </form>
  );
};
