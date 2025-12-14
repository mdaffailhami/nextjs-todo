# Refactoring Remaining Components to useActionState

## Goal Description
Refactor all remaining forms and dialogs to use the `useActionState` hook instead of `useTransition` and manual error handling. This ensures consistency across the application, leverages React's latest patterns for server actions, and simplifies state management.

## Proposed Changes

### Auth Components

#### [MODIFY] [signup/page.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(auth)/signup/page.tsx)
- Replace `useTransition` and manual [onSubmit](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/%28main%29/%28task%29/dialogs/edit-task-dialog.tsx#18-40) with `useActionState`.
- Remove local `error` state.
- Use `action={dispatch}` on the form.

#### [MODIFY] [request-code-dialog.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(auth)/dialogs/request-code-dialog.tsx)
- Refactor to use `useActionState`.

#### [MODIFY] [code-verification-dialog.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(auth)/dialogs/code-verification-dialog.tsx)
- Refactor to use `useActionState`.

#### [MODIFY] [new-password-dialog.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(auth)/dialogs/new-password-dialog.tsx)
- Refactor to use `useActionState`.

### Task Components

#### [MODIFY] [add-task-dialog.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(main)/(task)/dialogs/add-task-dialog.tsx)
- Refactor to use `useActionState`.

#### [MODIFY] [edit-task-dialog.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(main)/(task)/dialogs/edit-task-dialog.tsx)
- Refactor to use `useActionState`.

#### [MODIFY] [delete-task-dialog.tsx](file:///home/mdaffailhami/Documents/nextjs-todo/src/app/(main)/(task)/dialogs/delete-task-dialog.tsx)
- Refactor to use `useActionState`.

## Verification Plan
- Verify each form/dialog functions correctly after refactoring.
- Ensure error messages are displayed correctly.
- Ensure success actions (redirects, toasts, dialog closing) work as expected.
