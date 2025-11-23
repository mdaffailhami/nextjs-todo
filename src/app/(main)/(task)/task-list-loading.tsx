import { TaskCardSkeleton } from "@/components/task-card";

export function TaskListLoading() {
  return (
    <ul className="flex flex-col gap-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </ul>
  );
}
