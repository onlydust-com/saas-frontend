import { PropsWithChildren, useCallback, useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyH3 } from "@/shared/ui/typography";

export function IssueApplicantsPanel({ children, id }: PropsWithChildren<{ id: string }>) {
  const [open, setOpen] = useState(false);

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: id },
    options: {
      enabled: Boolean(id) && open,
    },
  });

  const renderContent = useCallback(() => {
    if (!contribution) return null;

    return (
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <div className={"flex w-full flex-row items-center justify-start gap-lg overflow-hidden"}>
              <ContributionBadge
                type={contribution.type}
                number={contribution.githubNumber}
                githubStatus={contribution.githubStatus}
              />

              <TypographyH3 className="line-clamp-1">{contribution.githubTitle}</TypographyH3>
            </div>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">Content</ScrollArea>

        <SheetFooter className="justify-end">
          <Button variant="outline">Scoring</Button>
          <Button variant="outline">See issue</Button>
        </SheetFooter>
      </SheetContent>
    );
  }, [contribution]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full">{children}</SheetTrigger>

      {renderContent()}
    </Sheet>
  );
}
