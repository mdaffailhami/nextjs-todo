import { TodoInput } from "@/app/(main)/todo-input";
import { TodoList } from "@/app/(main)/todo-list";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-y-3 px-2">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-primary text-2xl">NextJS Todo</CardTitle>
          <CardDescription>
            A simple todo list built with NextJS.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <TodoInput />
          <TodoList />
        </CardContent>
      </Card>
      <ThemeSwitcher />
    </main>
  );
}
