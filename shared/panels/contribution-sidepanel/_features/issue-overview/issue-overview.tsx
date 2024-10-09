import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { IssueOverviewProps } from "./issue-overview.types";

export function IssueOverview({ issue }: IssueOverviewProps) {
  return (
    <Card
      type={issue.type}
      githubTitle={issue.githubTitle}
      githubStatus={issue.githubStatus}
      githubNumber={issue.githubNumber}
      lastUpdatedAt={issue.lastUpdatedAt}
      applicants={[]}
      contributors={[]}
      githubLabels={issue.githubLabels}
    />
  );
}
