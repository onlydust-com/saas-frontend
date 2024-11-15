import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { Accordion } from "@/design-system/molecules/accordion";
import { CardContributionKanban } from "@/design-system/molecules/cards/card-contribution-kanban";

import { ContributionsAccordionProps } from "./contributions-accordion.types";

export function ContributionsAccordion({ ids }: ContributionsAccordionProps) {
  const { data } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      showLinkedIssues: false,
      sort: "UPDATED_AT",
      sortDirection: "DESC",
      ids,
      pageSize: ids?.length,
    },
    options: {
      enabled: Boolean(ids?.length),
    },
  });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  if (!contributions?.length) return null;

  return (
    <Accordion
      id={"contributions"}
      titleProps={{ translate: { token: "panels:rewardDetail.contribution.title" } }}
      badgeProps={{ children: contributions.length }}
    >
      {contributions.map(contribution => (
        <div key={contribution.id}>
          <CardContributionKanban
            key={contribution.id}
            type={contribution.type}
            githubTitle={contribution.githubTitle}
            githubStatus={contribution.githubStatus}
            githubNumber={contribution.githubNumber}
            lastUpdatedAt={contribution.lastUpdatedAt}
            rewardUsdAmount={contribution.totalRewardedUsdAmount}
            applicants={contribution.isNotAssigned() ? contribution.applicants : []}
            contributors={contribution.contributors}
            linkedIssues={contribution.linkedIssues}
            githubLabels={contribution.githubLabels}
          />
        </div>
      ))}
    </Accordion>
  );
}
