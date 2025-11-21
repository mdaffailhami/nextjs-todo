import { getSignedInUserTasks } from "@/lib/data/tasks";
import { TaskList } from "../task-list";

export default async function CompletedPage() {
  const tasks = await getSignedInUserTasks("completed");

  return <TaskList tasks={tasks} />;
}
