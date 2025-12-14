"use client";
import { createContext, useState, use } from "react";

export type IsEditTaskDialogOpenContextType = {
  isEditTaskDialogOpen: boolean;
  setIsEditTaskDialogOpen: (isEditTaskDialogOpen: boolean) => void;
};

const IsEditTaskDialogOpenContext =
  createContext<IsEditTaskDialogOpenContextType | null>(null);

export const useIsEditTaskDialogOpen = () => {
  const isEditTaskDialogOpen = use(IsEditTaskDialogOpenContext);
  if (!isEditTaskDialogOpen)
    throw new Error(
      "useIsEditTaskDialogOpen must be used within a IsEditTaskDialogOpenProvider",
    );
  return isEditTaskDialogOpen;
};

export const IsEditTaskDialogOpenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] =
    useState<boolean>(false);

  return (
    <IsEditTaskDialogOpenContext.Provider
      value={{ isEditTaskDialogOpen, setIsEditTaskDialogOpen }}
    >
      {children}
    </IsEditTaskDialogOpenContext.Provider>
  );
};
