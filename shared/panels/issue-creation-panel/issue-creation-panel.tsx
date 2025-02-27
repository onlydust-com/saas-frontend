import { useMemo } from "react";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Markdown } from "@/shared/features/markdown/markdown";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { CreationForm } from "./_features/creation-form/creation-form";
import { DefintionForm } from "./_features/defintion-form/defintion-form";
import { IssueCreationPanelProvider, useIssueCreationPanel } from "./issue-creation-panel.context";
import { IssueCreationPanelProps } from "./issue-creation-panel.types";

function IssuePreview() {
  const { user } = useAuthUser();
  const { issue } = useIssueCreationPanel();
  const title = issue?.title ?? "Your issue title";
  const body = issue?.body ?? "# Issue title\n\nIssue description";

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-b-border pb-3">
        <header className={"flex w-full flex-row items-center justify-start gap-3"}>
          <ContributionBadge type={"ISSUE"} number={0} showNumberOnHover githubStatus={"OPEN"} />
          <TypographyH4 className="line-clamp-1">{title}</TypographyH4>
        </header>

        <div className="flex flex-row gap-3">
          <TypographyMuted>Created now by</TypographyMuted>
          <Avatar className="size-5">
            <AvatarImage src={user?.avatarUrl} alt={user?.login} />
            <AvatarFallback className="size-5">{user?.login.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className={"pointer-events-none relative h-fit overflow-hidden transition-all"}>
        <Markdown content={body} />
      </div>
    </div>
  );
}
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

  const showPreview = step === "creation";

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "flex h-[calc(100vh-2rem)] max-h-[900px] w-[calc(100vw-2rem)] max-w-[700px] flex-col p-0 transition-all",
          {
            "max-w-[1400px]": showPreview,
          }
        )}
      >
        <div className="flex h-full flex-1 flex-row">
          <ScrollArea className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-4 p-6">
              <DialogHeader>
                <DialogTitle className="font-clash text-3xl font-medium tracking-tight">Issue Creator</DialogTitle>
              </DialogHeader>
              {Form}
            </div>
          </ScrollArea>
          {showPreview && (
            <ScrollArea className="flex flex-1 flex-col gap-4 bg-stack">
              <div className="flex flex-1 flex-col gap-4 p-6">
                <IssuePreview />
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function IssueCreationPanel({ children, projectId }: IssueCreationPanelProps) {
  return (
    <IssueCreationPanelProvider projectId={projectId}>
      <SafeIssueCreationPanel projectId={projectId}>{children}</SafeIssueCreationPanel>
    </IssueCreationPanelProvider>
  );
}
