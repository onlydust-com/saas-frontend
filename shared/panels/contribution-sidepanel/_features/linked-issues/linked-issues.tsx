import { Link } from "lucide-react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { useIsssuesSearchSidepanel } from "@/shared/panels/contribution-sidepanel/_features/issues-search-sidepanel/issues-search-sidepanel.hooks";

import { LinkedIssuesProps } from "./linked-issues.types";

export function LinkedIssues({ issues, contributionGithubId, canLinkIssues }: LinkedIssuesProps) {
  const { open } = useIsssuesSearchSidepanel();
  const { mutate, isPending } = ContributionReactQueryAdapter.client.usePatchContribution({
    // TODO WHEN BACKEND IS READY REMOVE toString()
    pathParams: { contributionId: contributionGithubId.toString() },
  });

  function onRemove(issueId: number) {
    mutate({
      linkedIssues: (issues || []).filter(issue => issue.githubId !== issueId).map(issue => issue.githubId),
    });
  }

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
            githubLabels={issue.githubLabels}
            actions={[
              {
                translate: { token: "panels:contribution.linkedIssues.remove" },
                onClick: () => onRemove(issue.githubId),
                isDisabled: isPending,
              },
            ]}
          />
        </div>
      ))}
      {canLinkIssues && (
        <div>
          <Button
            variant={"secondary"}
            startIcon={{ component: Link }}
            size={"sm"}
            translate={{ token: "panels:contribution.linkedIssues.button" }}
            classNames={{ base: "w-full" }}
            onClick={() => open({ contributionGithubId })}
          />
        </div>
      )}
    </Accordion>
  );
}
