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

## Specify app theme

```css
/* @/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

/* Focus style (e.g. Tab keyboard navigation) should be the same as hover */
@custom-variant hover (&:is(:hover, :focus-visible));

@theme inline {
  /* Brand colors */
  --color-primary: var(--primary);
  --color-on-primary: var(--on-primary);

  --color-destructive: var(--destructive);
  --color-on-destructive: var(--on-destructive);

  /* Neutral colors */
  --color-neutral-1: var(--neutral-1); /* (e.g. Main background) */
  --color-neutral-2: var(--neutral-2); /* (e.g. Card background) */
  --color-neutral-3: var(--neutral-3); /* (e.g. On hover background) */
  --color-neutral-4: var(--neutral-4); /* (e.g. Border) */

  --color-on-neutral-1: var(--on-neutral-1); /* (e.g. Primary text) */
  --color-on-neutral-2: var(--on-neutral-2); /* (e.g. Muted text) */

  /* Transitions */
  --default-transition-duration: 300ms;
}

:root {
  --primary: oklch(0.55 0.2 264.376);
  --on-primary: oklch(0.99 0 0);

  --destructive: oklch(0.58 0.24 25);
  --on-destructive: oklch(0.99 0 0);

  --neutral-1: oklch(0.99 0 0);
  --neutral-2: oklch(1 0 0);
  --neutral-3: oklch(0.96 0.005 270);
  --neutral-4: oklch(0.9 0.01 270);

  --on-neutral-1: oklch(0.15 0.01 270);
  --on-neutral-2: oklch(0.5 0.02 270);
}

.dark {
  --primary: oklch(67.936% 0.16867 263.806);
  --on-primary: oklch(0.99 0 0);

  --destructive: oklch(0.65 0.22 25);
  --on-destructive: oklch(0.99 0 0);

  --neutral-1: oklch(0.15 0.01 270);
  --neutral-2: oklch(0.2 0.015 270);
  --neutral-3: oklch(0.25 0.015 270);
  --neutral-4: oklch(0.3 0.02 270);

  --on-neutral-1: oklch(0.95 0 0);
  --on-neutral-2: oklch(0.55 0.02 270);
}

@layer base {
  * {
    /* Reset browser default focus styles (e.g. Tab keyboard navigation) */
    @apply outline-0 outline-transparent dark:outline-0 dark:outline-transparent;
  }

  body {
    @apply bg-neutral-1 text-on-neutral-1 border-neutral-4 font-sans antialiased transition-colors;
  }
}
```

## Specify font

```ts
// @/app/layout.tsx
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

```html
<!-- @/app/layout.tsx -->
<body className="{inter.variable}"></body>
```

```css
/* @/app/globals.css */
@theme inline {
  /* Fonts */
  --font-sans: var(--font-inter);

  /* Brand colors */
  --color-primary: var(--primary);
  ...
}
```

## Edit app metadata

```ts
// @/app/layout.tsx
export const metadata: Metadata = {
  title: "NextJS Todo",
  description: "A simple todo list built with NextJS.",
};
```

## Add ui components

```tsx
// @/components/ui/icon-button.tsx
import { cn } from "@/lib/utils";
import { Button } from "@base-ui-components/react";
import { type LucideIcon } from "lucide-react";

export type IconButtonProps = Button.Props & {
  variant: "filled" | "ghost";
  icon: LucideIcon;
};

export const IconButton = ({
  icon: Icon,
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      className={cn(
        "size-10 p-2.5 transition-colors",
        "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        variant === "filled" &&
          "bg-primary text-on-primary hover:outline-primary/75 hover:bg-primary/75 rounded-lg shadow-md outline-2 outline-offset-2",
        variant === "ghost" && "hover:bg-neutral-3 text-primary rounded-full",
        className,
      )}
      {...props}
    >
      <Icon className="size-full" />
    </Button>
  );
};
```

```tsx
// @/components/ui/checkbox.tsx
import { Checkbox as BaseCheckbox } from "@base-ui-components/react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = BaseCheckbox.Root.Props & {};

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <BaseCheckbox.Root
      className={cn(
        "bg-neutral-3 border-neutral-4 flex size-5.5 cursor-pointer overflow-hidden rounded-md border transition-colors",
        "group hover:bg-neutral-4",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="bg-primary group-hover:bg-primary/75 size-full p-0.5">
        <CheckIcon className={cn("text-on-primary size-full")} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
};
```

```ts
// @/components/ui/input.tsx
import { cn } from "@/lib/utils";
import { Input as BaseInput } from "@base-ui-components/react";

export type InputProps = BaseInput.Props & {};

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <BaseInput
      {...props}
      className={cn(
        "border-neutral-4 bg-neutral-2 h-10 w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors",
        "placeholder:text-on-neutral-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-neutral-1 focus:outline-primary/75 outline-2",
      )}
    />
  );
};
```

```tsx
// @/components/ui/skeleton.tsx
import { cn } from "@/lib/utils";

export const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("bg-neutral-3 animate-pulse", className)} {...props} />
  );
};
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
