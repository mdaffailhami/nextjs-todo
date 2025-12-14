import { getTasks } from "@/app/(main)/(task)/actions";
import { TaskListSection } from "../task-list-section";

export default async function CompletedPage() {
  const response = await getTasks({ category: "completed" });

  if (response.isError) throw new Error(response.message);

  return <TaskListSection type="completed" tasks={response.data} />;
}
