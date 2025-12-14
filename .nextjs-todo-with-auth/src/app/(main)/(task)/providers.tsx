import { IsAddTaskDialogOpenProvider } from "./states/is-add-task-dialog-open";
import { IsEditTaskDialogOpenProvider } from "./states/is-edit-task-dialog-open";
import { IsDeleteTaskDialogOpenProvider } from "./states/is-delete-task-dialog-open";

export default function TaskProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsAddTaskDialogOpenProvider>
      <IsEditTaskDialogOpenProvider>
        <IsDeleteTaskDialogOpenProvider>
          {children}
        </IsDeleteTaskDialogOpenProvider>
      </IsEditTaskDialogOpenProvider>
    </IsAddTaskDialogOpenProvider>
  );
}
