import { Pyramid } from "lucide-react";
import { PropsWithChildren, useCallback, useRef, useState } from "react";

import { ApplicantCard } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_components/applicant-card/applicant-card";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

const scoringCards = [
  {
    iconColor: "text-purple-500",
    title: "Global score",
    description:
      "The Global Score is a powerful tool that distills complex, multi-faceted performance data into a single, actionable number, enabling maintainers to make informed decisions quickly and confidently.",
  },
  {
    iconColor: "text-red-500",
    title: "Commitment score",
    description:
      "The Commitment Score evaluates a contributor's dedication to the project by analyzing their contributions, engagement, and commitment over time.",
  },
  {
    iconColor: "text-yellow-500",
    title: "Technical expertise",
    description:
      "The Technical Expertise Score assesses a contributor's technical skills and proficiency in the project's domain.",
  },
  {
    iconColor: "text-blue-500",
    title: "Project familiarity",
    description:
      "The Project Familiarity Score evaluates a contributor's familiarity with the project's codebase and community.",
  },
  {
    iconColor: "text-green-500",
    title: "Issue matching",
    description:
      "The Issue Matching Score assesses a contributor's ability to understand and match the project's needs.",
  },
];

export function IssueApplicantsPanel({ children, id }: PropsWithChildren<{ id: string }>) {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { data: contribution } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid: id },
    options: {
      enabled: Boolean(id) && open,
    },
  });

  const {
    data: dataApplicants,
    isLoading: isLoadingApplicants,
    isError: isErrorApplicants,
  } = IssueReactQueryAdapter.client.useGetIssueApplicants({
    pathParams: { contributionUuid: id },
    queryParams: {
      isIgnored: false,
    },
    options: {
      enabled: Boolean(id) && open,
    },
  });

  const applicants = dataApplicants?.pages.flatMap(page => page.applicants) ?? [];

  const renderHeader = useCallback(() => {
    if (!contribution) return null;

    return (
      <SheetHeader className={"flex w-full flex-row items-center justify-start gap-lg space-y-0"}>
        <ContributionBadge
          type={contribution.type}
          number={contribution?.githubNumber}
          githubStatus={contribution?.githubStatus}
        />

        <TypographyH4 className="line-clamp-1">{contribution?.githubTitle}</TypographyH4>
      </SheetHeader>
    );
  }, [contribution]);

  const renderApplications = useCallback(() => {
    if (isLoadingApplicants)
      return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-24" />);

    if (isErrorApplicants)
      return (
        <div className="py-10 text-center">
          <TypographyMuted>No applicants found</TypographyMuted>
        </div>
      );

    if (!applicants) return null;

    return applicants.map(applicant => <ApplicantCard key={applicant.applicationId} applicant={applicant} />);
  }, [applicants, isLoadingApplicants, isErrorApplicants]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full">{children}</SheetTrigger>

      <SheetContent ref={sheetRef} className="flex flex-col">
        {renderHeader()}

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2">{renderApplications()}</div>
        </ScrollArea>

        <SheetFooter className="justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Scoring</Button>
            </SheetTrigger>
            <SheetContent
              portalProps={{ container: sheetRef.current }}
              overlayProps={{ className: "absolute" }}
              className="absolute flex flex-col gap-3"
              side="bottom"
            >
              <SheetHeader>
                <SheetTitle>How does scoring work?</SheetTitle>
              </SheetHeader>

              {scoringCards.map(card => (
                <Card key={card.title} className="flex flex-col gap-3 p-3">
                  <header className="flex flex-col gap-2">
                    <Pyramid className={cn(card.iconColor)} />
                    <CardTitle>{card.title}</CardTitle>
                  </header>
                  <TypographyMuted>{card.description}</TypographyMuted>
                </Card>
              ))}
            </SheetContent>
          </Sheet>

          <Button variant="outline">See issue</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
