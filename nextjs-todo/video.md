## Initial Next.js Project

> npx create-next-app@latest .

## Install dependencies

> npm install next-themes @base-ui-components/react clsx tailwind-merge

## Run the project

> npm run dev

## Delete unused assets

Remove unused assets in `public` folder.

## Create cn utility function

```ts
// @/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
```

## Add ui components

> IconButton, Input, Checkbox, & Skeleton
> https://github.com/mdaffailhami/mdaffailhami-react-ui

## Specify app theme

> https://github.com/mdaffailhami/mdaffailhami-react-ui

## Edit app metadata & change font to Inter

```tsx
// @/app/layout.tsx
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Todo",
  description: "A simple todo list built with NextJS.",
};

<body className={inter.variable}>
```

## Create main page

```tsx
// @/app/(main)/page.tsx
import { TodoInput } from "./todo-input";
import { TodoList } from "./todo-list";

export default () => {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center gap-y-3 px-2 py-4">
      {/* Card */}
      <div className="border-neutral-3 bg-neutral-2 flex w-full max-w-sm flex-col gap-6 rounded-xl border p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-semibold">NextJS Todo</h1>
          <p className="text-sm">A simple todo list built with NextJS.</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </main>
  );
};
```

## Create todo input

```tsx
// @/app/(main)/todo-input.tsx
"use client";

import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { useTodos } from "@/states/todos";
import { PlusIcon } from "lucide-react";
import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react";
import { Input } from "@/components/ui/input";

export const TodoInput = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
};
```

## Create todo schema

```ts
// @/schema.ts
export type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};
```

## Create todo list

```tsx
// @/app/(main)/todo-list.tsx
"use client";

import { TodoCard, TodoCardSkeleton } from "@/components/todo-card";
import { useTodos } from "@/states/todos";
import { type Todo } from "@/schema.ts";

export const TodoList = () => {
  const todos: Todo[] = [
    { id: "123abc", name: "Todo 1", isCompleted: false },
    { id: "456def", name: "Todo 2", isCompleted: true },
    { id: "789ghi", name: "Todo 3", isCompleted: false },
  ];

  return (
    <div className="flex flex-col gap-2">
      {todos.value.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleTrigger={(id) => {}}
          onDeleteTrigger={(id) => {}}
        />
      ))}
    </div>
  );
};
```

## Create todo card

```tsx
// @/components/todo-card.tsx
"use client";

import { TrashIcon } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { type Todo } from "@/schema";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "./ui/skeleton";

type TodoCardProps = {
  todo: Todo;
  onToggleTrigger: (id: string) => void;
  onDeleteTrigger: (id: string) => void;
};

export const TodoCard = ({
  todo,
  onToggleTrigger,
  onDeleteTrigger,
}: TodoCardProps) => {
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
            "cursor-pointer truncate text-sm font-medium transition-all",
            todo.isCompleted && "text-on-neutral-2 line-through",
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
};

export const TodoCardSkeleton = () => {
  return (
    <div className="border-neutral-3 bg-neutral-2 flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all">
      <div className="flex items-center gap-3 overflow-hidden">
        <Skeleton className="size-5.5 rounded-full" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      <Skeleton className="size-10 rounded-full" />
    </div>
  );
};
```

## Create theme switcher

```tsx
// @/components/theme-switcher.tsx
"use client";

import { EllipsisIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "@/components/ui/icon-button";

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  return (
    <IconButton
      className={className}
      variant="filled"
      icon={(() => {
        if (theme === "dark") return MoonIcon;
        if (theme === "light") return SunIcon;
        return LaptopIcon;
      })()}
      onClick={handleClick}
    />
  );
};
```

## Wrap root layout with theme provider

```tsx
// @/app/layout.tsx
...

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
          <ThemeSwitcher className="fixed right-3 bottom-3" />
        </Providers>
      </body>
    </html>
  );
};
```

## Create useIsHydrated hook

```tsx
// @/hooks.ts
import { useEffect, useState } from "react";

export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
```

## Use useIsHydrated hook to theme switcher

```tsx
// @/components/theme-switcher.tsx
...
import { useIsHydrated } from "@/hooks";

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  ...

  return (
    <IconButton
      ...
      disabled={!isHydrated}
      icon={(() => {
        // If it's not hydrated yet
        if (!isHydrated) return EllipsisIcon;
        ...
      })()}
    />
  );
};
```

## Create todos state

```tsx
// @/states/todos.ts
"use client";

import { Todo } from "@/schema";
import { createContext, useState, use, useEffect } from "react";

const STORAGE_KEY = "todos";

export type TodosContextType = {
  value: Todo[];
  add: (name: string) => void;
  delete: (id: string) => void;
  toggleCompletion: (id: string) => void;
  isLoaded: boolean;
};

const TodosContext = createContext<TodosContextType | null>(null);

export const useTodos = () => {
  const context = use(TodosContext);
  if (!context) throw new Error("useTodos must be used within a TodosProvider");
  return context;
};

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);

    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error(`Failed to parse todos from local storage:\n${error}`);
        alert(`Failed to parse todos from local storage:\n${error}`);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save to local storage whenever the "todos" is changed & also after the "todos" is loaded
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const add = (name: string) => {
    // Create todo
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      isCompleted: false,
    };

    // Update state
    setTodos((todos) => [newTodo, ...todos]);
  };

  const toggleCompletion = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{
        value: todos,
        add,
        toggleCompletion,
        delete: deleteTodo,
        isLoaded,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
```

## Use todos provider

```tsx
// @/app/layout.tsx
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
};
```

## Implement "add todo" feature

```tsx
// @/app/(main)/todo-input.tsx

...

import { useTodos } from "@/states/todos";

export const TodoInput = () => {
  const todos = useTodos();

  ...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      // Add todo
      todos.add(name.trim());

      // Reset input
      setName("");
    }
  };

  ...

};
```

## Implement "delete todo" & "toggle todo" features

```tsx
// @/app/(main)/todo-list.tsx

...

import { useTodos } from "@/states/todos";

export const TodoList = () => {
  const todos = useTodos();

  return (
    <div className="flex flex-col gap-2">
      {todos.value.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleTrigger={(id) => todos.toggleCompletion(id)}
          onDeleteTrigger={(id) => todos.delete(id)}
        />
      ))}
    </div>
  );
};
```

## Display "todos loading" & "zero todos" state messages

```tsx
// @/app/(main)/todo-list.tsx

...

// If loading
  if (!todos.isLoaded) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <TodoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If there is no todo
  if (todos.value.length === 0) {
    return (
      <div className="text-on-neutral-2 border-neutral-4 flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-sm">
        <p>No todos yet.</p>
        <p>Add one to get started!</p>
      </div>
    );
  }

...

```
