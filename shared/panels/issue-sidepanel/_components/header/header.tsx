import { ChevronLeft } from "lucide-react";

import { ContributionGithubStatusUnion } from "@/core/domain/contribution/models/contribution.types";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { Button } from "@/shared/ui/button";
import { SheetHeader } from "@/shared/ui/sheet";
import { TypographyH4 } from "@/shared/ui/typography";

export function Header({
  issueNumber,
  issueStatus,
  issueTitle,
  onBack,
}: {
  issueNumber: number;
  issueStatus: ContributionGithubStatusUnion;
  issueTitle: string;
  onBack?: () => void;
}) {
  return (
    <SheetHeader>
      <div className="flex items-center gap-2 text-left">
        {onBack ? (
          <Button variant="ghost" size="icon" className="shrink-0" onClick={onBack}>
            <ChevronLeft />
          </Button>
        ) : null}
        <ContributionBadge type="ISSUE" number={issueNumber} githubStatus={issueStatus} />
        <TypographyH4 className="line-clamp-1">{issueTitle}</TypographyH4>
      </div>
    </SheetHeader>
  );
}
