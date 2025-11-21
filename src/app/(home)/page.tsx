import { getSignedInUserTasks } from "@/lib/data/tasks";
import { TaskList } from "./task-list";

export default async function HomePage() {
  const tasks = await getSignedInUserTasks("active");

  return <TaskList tasks={tasks} />;
}
