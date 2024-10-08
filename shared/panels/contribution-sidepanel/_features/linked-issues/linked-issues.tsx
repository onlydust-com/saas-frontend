import { Link } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { LinkedIssuesProps } from "./linked-issues.types";

export function LinkedIssues(_: LinkedIssuesProps) {
  return (
    <Accordion
      id={"linked-issues"}
      titleProps={{ translate: { token: "panels:contribution.linkedIssues.title" } }}
      defaultSelected={["linked-issues"]}
    >
      <div>
        <Card
          type={"ISSUE"}
          githubTitle={"issue title"}
          githubStatus={"OPEN"}
          githubNumber={7777}
          lastUpdatedAt={"2021-09-09T00:00:00Z"}
          applicants={[]}
          contributors={[]}
          githubLabels={[{ name: "bug" }]}
        />
      </div>
      <div>
        <Card
          type={"ISSUE"}
          githubTitle={"issue title"}
          githubStatus={"OPEN"}
          githubNumber={7777}
          lastUpdatedAt={"2021-09-09T00:00:00Z"}
          applicants={[]}
          contributors={[]}
          githubLabels={[{ name: "bug" }]}
        />
      </div>
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
