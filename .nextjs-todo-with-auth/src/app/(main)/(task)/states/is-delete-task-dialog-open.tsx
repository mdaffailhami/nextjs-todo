"use client";
import { createContext, useState, use } from "react";

export type IsDeleteTaskDialogOpenContextType = {
  isDeleteTaskDialogOpen: boolean;
  setIsDeleteTaskDialogOpen: (isDeleteTaskDialogOpen: boolean) => void;
};

const IsDeleteTaskDialogOpenContext =
  createContext<IsDeleteTaskDialogOpenContextType | null>(null);

export const useIsDeleteTaskDialogOpen = () => {
  const isDeleteTaskDialogOpen = use(IsDeleteTaskDialogOpenContext);
  if (!isDeleteTaskDialogOpen)
    throw new Error(
      "useIsDeleteTaskDialogOpen must be used within a IsDeleteTaskDialogOpenProvider",
    );
  return isDeleteTaskDialogOpen;
};

export const IsDeleteTaskDialogOpenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] =
    useState<boolean>(false);

  return (
    <IsDeleteTaskDialogOpenContext.Provider
      value={{
        isDeleteTaskDialogOpen,
        setIsDeleteTaskDialogOpen,
      }}
    >
      {children}
    </IsDeleteTaskDialogOpenContext.Provider>
  );
};
