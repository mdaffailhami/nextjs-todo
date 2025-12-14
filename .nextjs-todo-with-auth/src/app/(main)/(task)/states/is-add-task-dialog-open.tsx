"use client";
import { createContext, useState, use } from "react";

export type IsAddTaskDialogOpenContextType = {
  isAddTaskDialogOpen: boolean;
  setIsAddTaskDialogOpen: (
    isAddTaskDialogOpen: IsAddTaskDialogOpenContextType["isAddTaskDialogOpen"],
  ) => void;
};

const IsAddTaskDialogOpenContext =
  createContext<IsAddTaskDialogOpenContextType | null>(null);

export const useIsAddTaskDialogOpen = () => {
  const isAddTaskDialogOpen = use(IsAddTaskDialogOpenContext);
  if (!isAddTaskDialogOpen)
    throw new Error(
      "useIsAddTaskDialogOpen must be used within a IsAddTaskDialogOpenProvider",
    );
  return isAddTaskDialogOpen;
};

export const IsAddTaskDialogOpenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] =
    useState<boolean>(false);

  return (
    <IsAddTaskDialogOpenContext.Provider
      value={{ isAddTaskDialogOpen, setIsAddTaskDialogOpen }}
    >
      {children}
    </IsAddTaskDialogOpenContext.Provider>
  );
};
