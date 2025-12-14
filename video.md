## Initialize Project

> npx create-next-app@latest .

## Add Shadcn UI

> npx shadcn@latest create --preset "https://ui.shadcn.com/init?base=base&style=maia&baseColor=zinc&theme=cyan&iconLibrary=lucide&font=inter&menuAccent=subtle&menuColor=default&radius=large&template=next" --template next

> Name: .

## If installation error, install it manually

`Don't forget to add next-themes too`

> npm install clsx tailwind-merge 'shadcn@latest' class-variance-authority tw-animate-css '@base-ui/react' lucide-react next-themes

## Add Shadcn UI Components

> npx shadcn@latest add button checkbox input label skeleton

## Specify metadata, font, and theme

```ts
// @/lib/constants.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextJS Todo",
  description: "A simple todo app built with NextJS.",
};
```

```tsx
// @/app/layout.tsx
...

export { metadata } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
};

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
};
```

## Don't forget to also specify the font & theme transition

```css
/* @/app/globals.css */

... 

/*  */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground font-sans transition-colors;
  }
}
```

## Create Theme Switcher

```tsx
// @/app/theme-switcher.tsx

"use client";

...

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const Icon = (() => {
    // If it's not hydrated yet
    if (!isHydrated) return EllipsisIcon;

    if (theme === "dark") return MoonIcon;
    if (theme === "light") return SunIcon;
    return LaptopIcon;
  })();

  return (
    <Button
      disabled={!isHydrated}
      variant="default"
      size="icon-lg"
      onClick={handleClick}
      className="fixed right-2 top-2 rounded-md"
    >
      <Icon className="size-5" />
    </Button>
  );
};
```

## Create useIsHydrated hook

```tsx
// @/hooks.ts

export const useIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
};
```

## Create todo schema

```ts
// @/lib/schemas.ts
export type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};
```

## Create todos context

```tsx
// @/contexts/todos.tsx
"use client";

import type { Todo } from "@/lib/schemas";
import { createContext, useState, use, useEffect } from "react";

const STORAGE_KEY = "todos";

export type TodosContextType = {
  todos: Todo[];
  addTodo: (name: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
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
        const message = `Failed to parse todos from local storage:\n${error}`;
        console.error(message);
        alert(message);
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

  const addTodo = (name: string) => {
    // Create todo
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      isCompleted: false,
    };

    // Update state
    setTodos((todos) => [newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        isLoaded,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
```

## Add TodosProvider

```tsx
// @/app/layout.tsx
...

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>{children}</TodosProvider>
    </ThemeProvider>
  );
};

...
```

## Create main page

```tsx
// @/app/(main)/page.tsx
export default () => {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      {/* Card */}
      <div className="bg-card flex flex-col w-full max-w-sm gap-6 rounded-xl border p-6 shadow-md">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-semibold">
            {metadata.title as string}
          </h1>
          <p className="text-sm">{metadata.description}</p>
        </div>

        <TodoInput />
        <TodoList />
      </div>
    </main>
  );
};
```

## Create TodoInput

```tsx
// @/app/(main)/todo-input.tsx
"use client";
...

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
```

## Create TodoCard & TodoCardSkeleton components

```tsx
// @/components/todo-card.tsx
"use client";
...
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
            "truncate cursor-pointer",
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
```

## Create TodoList

```tsx
// @/app/(main)/todo-list.tsx
"use client";

import { TodoCard, TodoCardSkeleton } from "@/components/todo-card";
import { useTodos } from "@/contexts/todos";

export const TodoList = () => {
  const { todos, isLoaded, toggleTodo, deleteTodo } = useTodos();

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <TodoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If there is no todo
  if (todos.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-sm">
        <p>No todos yet.</p>
        <p>Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          handleToggle={(id) => toggleTodo(id)}
          handleDelete={(id) => deleteTodo(id)}
        />
      ))}
    </div>
  );
};
```
