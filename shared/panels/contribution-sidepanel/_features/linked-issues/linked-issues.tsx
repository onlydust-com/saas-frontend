import { Accordion } from "@/design-system/molecules/accordion";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { LinkedIssuesProps } from "./linked-issues.types";

export function LinkedIssues({ issues }: LinkedIssuesProps) {
  return (
    <Accordion
      id={"linked-issues"}
      titleProps={{ translate: { token: "panels:contribution.linkedIssues.title" } }}
      defaultSelected={["linked-issues"]}
    >
      {issues?.map(issue => (
        <div key={issue.githubNumber}>
          <Card
            type={issue.type}
            githubTitle={issue.githubTitle}
            githubStatus={issue.githubStatus}
            githubNumber={issue.githubNumber}
            // TODO lastUpdatedAt githubLabels
            // lastUpdatedAt={issue.lastUpdatedAt}
            // githubLabels={issue.githubLabels}
          />
        </div>
      ))}
    </Accordion>
  );
}
