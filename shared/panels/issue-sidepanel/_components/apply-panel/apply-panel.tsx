import { PropsWithChildren } from "react";

import { ContributionGithubStatusUnion } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyH4 } from "@/shared/ui/typography";

export function ApplyPanel({
  children,
  issueTitle,
  issueNumber,
  issueStatus,
}: PropsWithChildren<{ issueTitle: string; issueNumber: number; issueStatus: ContributionGithubStatusUnion }>) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="isolate flex h-full flex-col" overlayProps={{ className: "bg-transparent" }}>
        <SheetHeader>
          <div className="flex w-full flex-row items-center justify-start gap-lg overflow-hidden">
            <ContributionBadge type="ISSUE" number={issueNumber} githubStatus={issueStatus} />
            <TypographyH4 className="line-clamp-1">{issueTitle}</TypographyH4>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-auto"></div>
      </SheetContent>
    </Sheet>
  );
}
