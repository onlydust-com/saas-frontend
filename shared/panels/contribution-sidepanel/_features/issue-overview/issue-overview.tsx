import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Accordion } from "@/design-system/molecules/accordion";
import {
  CardContributionKanban as Card,
  CardContributionKanbanLoading,
} from "@/design-system/molecules/cards/card-contribution-kanban";

import { IssueOverviewProps } from "./issue-overview.types";

function LinkedIssues({ issueIds }: { issueIds?: string[] }) {
  const { data, isLoading } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      ids: issueIds,
      pageSize: 100,
    },
    options: {
      enabled: Boolean(issueIds?.length),
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  function renderContributions() {
    if (isLoading) {
      return (
        <div>
          <CardContributionKanbanLoading />
        </div>
      );
    }

    return contributions.map(contribution => (
      <div key={contribution.id}>
        <Card
          type={contribution.type}
          githubTitle={contribution.githubTitle}
          githubStatus={contribution.githubStatus}
          githubNumber={contribution.githubNumber}
          githubLabels={contribution.githubLabels}
          languages={contribution.languages}
          repo={contribution.repo}
        />
      </div>
    ));
  }

  if (!issueIds || (!isLoading && !data)) return null;

  return (
    <Accordion
      classNames={{ base: "flex flex-col gap-lg" }}
      id={"issues"}
      titleProps={{
        translate: { token: "common:contribution.issue_other" },
        size: "sm",
      }}
      badgeProps={{
        children: contributions.length,
      }}
      defaultSelected={["issues"]}
    >
      {renderContributions()}
    </Accordion>
  );
}

export function IssueOverview({ contribution }: IssueOverviewProps) {
  if (contribution.isPullRequest()) {
    return (
      <LinkedIssues issueIds={contribution.linkedIssues?.map(issue => issue.contributionUuid ?? "").filter(Boolean)} />
    );
  }

  return (
    <Card
      type={contribution.type}
      githubTitle={contribution.githubTitle}
      githubStatus={contribution.githubStatus}
      githubNumber={contribution.githubNumber}
      lastUpdatedAt={contribution.lastUpdatedAt}
      githubLabels={contribution.githubLabels}
      languages={contribution.languages}
      repo={contribution.repo}
      linkedIssues={contribution.linkedIssues}
      rewardUsdAmount={contribution.totalRewardedUsdAmount}
    />
  );
}
