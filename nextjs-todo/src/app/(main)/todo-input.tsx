"use client";

import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { useTodos } from "@/states/todos";
import { PlusIcon } from "lucide-react";
import { Field } from "@base-ui-components/react/field";
import { cn } from "@/lib/utils";
import { Form } from "@base-ui-components/react";
import { Input } from "@/components/ui/input";

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
    <Form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Field.Root className="flex-1">
        <Field.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          render={(props) => (
            <Input type="text" placeholder="Enter new todo.." {...props} />
          )}
        />
      </Field.Root>

      <IconButton
        variant="filled"
        icon={PlusIcon}
        type="submit"
        disabled={!name.trim()}
      />
    </Form>
  );
}
