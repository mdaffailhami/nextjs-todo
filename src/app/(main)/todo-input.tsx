"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/contexts/todos";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const TodoInput = () => {
  const { addTodo } = useTodos();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      addTodo(name.trim());

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
      />

      <Button
        variant="default"
        size="icon-lg"
        type="submit"
        disabled={!name.trim()}
      >
        <PlusIcon className="size-5" />
      </Button>
    </form>
  );
};
