import { Link } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
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
            lastUpdatedAt={issue.lastUpdatedAt}
            applicants={[]}
            contributors={[]}
            githubLabels={issue.githubLabels}
          />
        </div>
      ))}
      <div>
        <Button
          variant={"secondary"}
          startIcon={{ component: Link }}
          size={"sm"}
          translate={{ token: "panels:contribution.linkedIssues.button" }}
          classNames={{ base: "w-full" }}
        />
      </div>
    </Accordion>
  );
}
