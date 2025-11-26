"use client";
import { createContext, useState, use } from "react";

export type IsNewPasswordDialogOpenContextType = {
  isNewPasswordDialogOpen: boolean;
  setIsNewPasswordDialogOpen: (isNewPasswordDialogOpen: boolean) => void;
};

const IsNewPasswordDialogOpenContext =
  createContext<IsNewPasswordDialogOpenContextType | null>(null);

export const useIsNewPasswordDialogOpen = () => {
  const isNewPasswordDialogOpen = use(IsNewPasswordDialogOpenContext);
  if (!isNewPasswordDialogOpen)
    throw new Error(
      "useIsNewPasswordDialogOpen must be used within a IsNewPasswordDialogOpenProvider",
    );
  return isNewPasswordDialogOpen;
};

export const IsNewPasswordDialogOpenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNewPasswordDialogOpen, setIsNewPasswordDialogOpen] =
    useState<boolean>(false);

  return (
    <IsNewPasswordDialogOpenContext.Provider
      value={{ isNewPasswordDialogOpen, setIsNewPasswordDialogOpen }}
    >
      {children}
    </IsNewPasswordDialogOpenContext.Provider>
  );
};
