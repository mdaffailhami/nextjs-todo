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
        console.error("Failed to parse todos from local storage:", error);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save to local storage whenever todos change & also after the todos is loaded
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
