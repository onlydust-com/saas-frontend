"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

interface IssueCreationPanelContextInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  step: "definition" | "creation";
  setStep: (step: "definition" | "creation") => void;
}

export const IssueCreationPanelContext = createContext<IssueCreationPanelContextInterface>({
  open: false,
  setOpen: () => {},
  step: "definition",
  setStep: () => {},
});

export function IssueCreationPanelProvider({ children, projectId }: PropsWithChildren & { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"definition" | "creation">("definition");

  return (
    <IssueCreationPanelContext.Provider value={{ open, setOpen, step, setStep }}>
      {children}
    </IssueCreationPanelContext.Provider>
  );
}

export function useIssueCreationPanel() {
  return useContext(IssueCreationPanelContext);
}
