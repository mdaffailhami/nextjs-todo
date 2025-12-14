"use client";
import { createContext, useState, use } from "react";

export type IsRequestCodeDialogOpenContextType = {
  isRequestCodeDialogOpen: boolean;
  setIsRequestCodeDialogOpen: (isRequestCodeDialogOpen: boolean) => void;
};

const IsRequestCodeDialogOpenContext =
  createContext<IsRequestCodeDialogOpenContextType | null>(null);

export const useIsRequestCodeDialogOpen = () => {
  const isRequestCodeDialogOpen = use(IsRequestCodeDialogOpenContext);
  if (!isRequestCodeDialogOpen)
    throw new Error(
      "useIsRequestCodeDialogOpen must be used within a IsRequestCodeDialogOpenProvider",
    );
  return isRequestCodeDialogOpen;
};

export const IsRequestCodeDialogOpenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isRequestCodeDialogOpen, setIsRequestCodeDialogOpen] =
    useState<boolean>(false);

  return (
    <IsRequestCodeDialogOpenContext.Provider
      value={{ isRequestCodeDialogOpen, setIsRequestCodeDialogOpen }}
    >
      {children}
    </IsRequestCodeDialogOpenContext.Provider>
  );
};
