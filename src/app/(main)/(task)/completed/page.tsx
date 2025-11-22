import { getTasks } from "@/lib/actions/task";
import { TaskListSection } from "../task-list-section";

export default async function CompletedPage() {
  const tasks = await getTasks("completed");

  return <TaskListSection type="completed" tasks={tasks} />;
}
