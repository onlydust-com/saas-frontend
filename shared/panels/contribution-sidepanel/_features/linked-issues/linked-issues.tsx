import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Accordion } from "@/design-system/molecules/accordion";
import {
  CardContributionKanban as Card,
  CardContributionKanbanLoading,
} from "@/design-system/molecules/cards/card-contribution-kanban";

import { LinkedIssuesProps } from "./linked-issues.types";

export function LinkedIssues({ issues }: LinkedIssuesProps) {
  const issueIds = (issues || []).map(issue => issue.contributionUuid ?? "").filter(Boolean);

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
      id={"linked-issues"}
      titleProps={{ translate: { token: "panels:contribution.linkedIssues.title" } }}
      defaultSelected={["linked-issues"]}
      badgeProps={{
        children: contributions.length,
      }}
    >
      {renderContributions()}
    </Accordion>
  );
}
