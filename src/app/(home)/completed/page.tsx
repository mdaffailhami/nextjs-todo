import { getTasks } from "@/lib/actions/task";
import { TaskList } from "../task-list";

export default async function CompletedPage() {
  const tasks = await getTasks("completed");

  return <TaskList tasks={tasks} />;
}
