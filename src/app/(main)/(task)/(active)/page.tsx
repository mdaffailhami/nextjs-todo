import { getTasks } from "@/lib/actions/task";
import { TaskList } from "../task-list";

export default async function HomePage() {
  const tasks = await getTasks("active");

  return <TaskList type="active" tasks={tasks} />;
}
