import { useMemo } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

import { CreationForm } from "./_features/creation-form/creation-form";
import { DefintionForm } from "./_features/defintion-form/defintion-form";
import { IssueCreationPanelProvider, useIssueCreationPanel } from "./issue-creation-panel.context";
import { IssueCreationPanelProps } from "./issue-creation-panel.types";

function SafeIssueCreationPanel({ children }: IssueCreationPanelProps) {
  const { open, setOpen, step } = useIssueCreationPanel();

  const Form = useMemo(() => {
    if (step === "definition") {
      return <DefintionForm />;
    }

    if (step === "creation") {
      return <CreationForm />;
    }

    return null;
  }, [step]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={"flex flex-col"}>{Form}</SheetContent>
    </Sheet>
  );
}

export function IssueCreationPanel({ children, projectId }: IssueCreationPanelProps) {
  return (
    <IssueCreationPanelProvider projectId={projectId}>
      <SafeIssueCreationPanel projectId={projectId}>{children}</SafeIssueCreationPanel>
    </IssueCreationPanelProvider>
  );
}
