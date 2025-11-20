import { TaskCard } from "@/components/task-card";
import { getTasksByUserEmail } from "@/lib/data/tasks";

export default async function HomePage() {
  const tasks = await getTasksByUserEmail({
    email: "mdaffailhami@gmail.com",
    status: "active",
  });

  return (
    <ul className="flex flex-col gap-y-2">
      {tasks.map((task, i) => (
        <TaskCard key={i} {...task} />
      ))}
    </ul>
  );
}
