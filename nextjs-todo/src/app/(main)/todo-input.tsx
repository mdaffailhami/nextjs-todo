"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/states/todos";

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
      <Input
        type="text"
        placeholder="Enter new todo.."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!name.trim()}>
        <PlusIcon className="size-4" />
        <span className="sr-only">Add Todo</span>
      </Button>
    </form>
  );
}
