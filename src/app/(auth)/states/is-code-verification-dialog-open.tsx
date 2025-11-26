"use client";
import { createContext, useState, use } from "react";

export type IsCodeVerificationDialogOpenContextType = {
  isCodeVerificationDialogOpen: boolean;
  setIsCodeVerificationDialogOpen: (
    isCodeVerificationDialogOpen: IsCodeVerificationDialogOpenContextType["isCodeVerificationDialogOpen"],
  ) => void;
};

const IsCodeVerificationDialogOpenContext =
  createContext<IsCodeVerificationDialogOpenContextType | null>(null);

export const useIsCodeVerificationDialogOpen = () => {
  const isCodeVerificationDialogOpen = use(IsCodeVerificationDialogOpenContext);
  if (!isCodeVerificationDialogOpen)
    throw new Error(
      "useIsCodeVerificationDialogOpen must be used within a IsCodeVerificationDialogOpenProvider",
    );
  return isCodeVerificationDialogOpen;
};

export const IsCodeVerificationDialogOpenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCodeVerificationDialogOpen, setIsCodeVerificationDialogOpen] =
    useState<boolean>(false);

  return (
    <IsCodeVerificationDialogOpenContext.Provider
      value={{ isCodeVerificationDialogOpen, setIsCodeVerificationDialogOpen }}
    >
      {children}
    </IsCodeVerificationDialogOpenContext.Provider>
  );
};
