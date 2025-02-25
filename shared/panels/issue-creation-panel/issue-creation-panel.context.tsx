"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

interface IssueCreationPanelContextInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  step: "definition" | "creation";
  setStep: (step: "definition" | "creation") => void;
  issue: Issue | null;
  setIssue: (issue: Issue) => void;
  projectId: string;
}

interface Issue {
  title: string;
  body: string;
  repoId: number;
}

export const IssueCreationPanelContext = createContext<IssueCreationPanelContextInterface>({
  open: false,
  setOpen: () => {},
  step: "definition",
  setStep: () => {},
  issue: null,
  setIssue: () => {},
  projectId: "",
});

export function IssueCreationPanelProvider({ children, projectId }: PropsWithChildren & { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"definition" | "creation">("definition");
  const [issue, setIssue] = useState<Issue | null>(null);

  return (
    <IssueCreationPanelContext.Provider value={{ open, setOpen, step, setStep, issue, setIssue, projectId }}>
      {children}
    </IssueCreationPanelContext.Provider>
  );
}

export function useIssueCreationPanel() {
  return useContext(IssueCreationPanelContext);
}
