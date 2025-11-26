import { getTasks } from "@/app/(main)/(task)/actions";
import { TaskListSection } from "../task-list-section";

export default async function HomePage() {
  const response = await getTasks({ category: "active" });

  if (response.isError) throw new Error(response.message);

  return <TaskListSection type="active" tasks={response.data} />;
}
