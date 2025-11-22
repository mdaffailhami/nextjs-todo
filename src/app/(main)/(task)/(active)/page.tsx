import { getTasks } from "@/lib/actions/task";
import { TaskListSection } from "../task-list-section";

export default async function HomePage() {
  const tasks = await getTasks("active");

  return <TaskListSection type="active" tasks={tasks} />;
}
