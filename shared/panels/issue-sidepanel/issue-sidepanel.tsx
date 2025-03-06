import { Github } from "lucide-react";
import { PropsWithChildren, useCallback, useState } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { IssueInterface } from "@/core/domain/issue/models/issue-model";

import { ContributionBadge } from "@/design-system/molecules/contribution-badge/variants/contribution-badge-default";

import { ApplyCounter } from "@/shared/features/issues/apply-counter/apply-counter";
import { ApplyIssueGuideline } from "@/shared/features/issues/apply-issue-guideline/apply-issue-guideline";
import { ApplyPanel } from "@/shared/panels/issue-sidepanel/_components/apply-panel/apply-panel";
import { Metrics } from "@/shared/panels/issue-sidepanel/_components/metrics/metrics";
import { Summary } from "@/shared/panels/issue-sidepanel/_components/summary/summay";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetError, SheetHeader, SheetLoading, SheetTrigger } from "@/shared/ui/sheet";
import { TypographyH4 } from "@/shared/ui/typography";

export function IssueSidepanel({
  children,
  issueId,
  contributionUuid,
}: PropsWithChildren<{ issueId?: number; contributionUuid?: string }>) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <Content open={open} issueId={issueId} contributionUuid={contributionUuid} />
    </Sheet>
  );
}

function Content({
  open,
  issueId = 0,
  contributionUuid = "",
}: {
  open: boolean;
  issueId?: number;
  contributionUuid?: string;
}) {
  const {
    data: issueData,
    isLoading: isIssueLoading,
    isError: isIssueError,
  } = IssueReactQueryAdapter.client.useGetIssue({
    pathParams: { issueId },
    options: { enabled: Boolean(issueId) && open },
  });

  const {
    data: contribution,
    isLoading: isContributionLoading,
    isError: isContributionError,
  } = ContributionReactQueryAdapter.client.useGetContributionById({
    pathParams: { contributionUuid },
    options: { enabled: Boolean(contributionUuid) && open },
  });

  const isLoading = isIssueLoading || isContributionLoading;

  const isError = isIssueError || isContributionError;

  const issue = issueData ? issueData : contribution ? issueFromContribution(contribution) : undefined;

  const isHackathon = !!issue?.hackathon?.id || !!contribution?.isIncludedInLiveHackathon;

  const renderContent = useCallback(() => {
    if (isLoading) return <SheetLoading />;

    if (!issue || isError) return <SheetError />;

    return (
      <>
        <SheetHeader>
          <div className="flex w-full flex-row items-center justify-start gap-lg overflow-hidden">
            <ContributionBadge type="ISSUE" number={issue.number} githubStatus={issue.status} />
            <TypographyH4 className="line-clamp-1">{issue.title}</TypographyH4>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          <Metrics
            applicantsCount={issue.applicants.length}
            commentsCount={issue.commentCount}
            createdAt={issue.createdAt}
          />

          <Summary body={issue.body} labels={issue.labels.map(label => label.name)} author={issue.author} />

          {isHackathon ? <ApplyIssueGuideline /> : null}
        </div>

        {isHackathon ? (
          <Card className="flex w-full flex-col gap-4 p-4">
            <div className="flex flex-col items-start gap-1">
              <TypographyH4>My applications limit</TypographyH4>
              <CardDescription>You can apply to 10 issues at a time.</CardDescription>
            </div>
            <ApplyCounter />
          </Card>
        ) : null}

        <footer className="flex w-full items-center justify-between">
          <Button variant="outline" size="icon" asChild>
            <a href={issue.htmlUrl} target="_blank" rel="noopener noreferrer">
              <Github />
            </a>
          </Button>

          <ApplyPanel issueTitle={issue.title} issueNumber={issue.number} issueStatus={issue.status}>
            <Button>Next</Button>
          </ApplyPanel>
        </footer>
      </>
    );
  }, [isLoading, isError, issue]);

  return <SheetContent className="flex h-full flex-col">{renderContent()}</SheetContent>;
}

function issueFromContribution(contribution: ContributionActivityInterface): IssueInterface {
  return {
    id: parseInt(contribution.githubId),
    number: contribution.githubNumber,
    title: contribution.githubTitle,
    status: issueStatus(contribution.githubStatus),
    htmlUrl: contribution.githubHtmlUrl,
    repo: contribution.repo,
    author: {
      ...contribution.githubAuthor,
      isRegistered: false,
    },
    createdAt: contribution.createdAt,
    closedAt: contribution.completedAt,
    body: contribution.githubBody,
    commentCount: contribution.githubCommentCount || 0,
    labels: contribution.githubLabels || [],
    applicants: contribution.applicants,
    assignees: contribution.contributors,
    languages: contribution.languages || [],
    project: contribution.project,
  };
}

function issueStatus(status: string) {
  switch (status) {
    case "OPEN":
      return "OPEN";
    case "COMPLETED":
      return "COMPLETED";
    default:
      return "CANCELLED";
  }
}
