import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
} from "@/core/domain/contribution/models/contribution.types";

import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { ShowMore } from "@/shared/components/show-more/show-more";
import { Translate } from "@/shared/translation/components/translate/translate";

function useAccordionItem({ type }: { type: ContributionActivityStatusUnion }): AccordionItemProps {
  const { data, hasNextPage, fetchNextPage, isLoading } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      statuses: [type],
    },
  });

  const contributions = data?.pages.flatMap(page => page.contributions) || [];

  const title = useMemo(() => {
    switch (type) {
      case ContributionActivityStatus.NOT_ASSIGNED:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.notAssigned"} />;
      case ContributionActivityStatus.IN_PROGRESS:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.inProgress"} />;
      case ContributionActivityStatus.TO_REVIEW:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.toReview"} />;
      case ContributionActivityStatus.DONE:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.done"} />;
      case ContributionActivityStatus.ARCHIVED:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.archive"} />;
      default:
        return null;
    }
  }, [type]);

  return {
    id: type,
    titleProps: {
      children: title,
    },
    badgeProps: {
      children: data?.pages[0].totalItemNumber,
    },
    content: (
      <>
        {contributions?.map(contribution => (
          <div key={contribution.id}>
            <ContributionBadge
              type={contribution.type}
              githubStatus={contribution.githubStatus}
              number={contribution.githubNumber}
            />
            {contribution.githubTitle}
          </div>
        ))}

        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isLoading} /> : null}
      </>
    ),
  };
}

export function ListView() {
  const items = [
    useAccordionItem({ type: ContributionActivityStatus.NOT_ASSIGNED }),
    useAccordionItem({ type: ContributionActivityStatus.IN_PROGRESS }),
    useAccordionItem({ type: ContributionActivityStatus.TO_REVIEW }),
    useAccordionItem({ type: ContributionActivityStatus.DONE }),
    useAccordionItem({ type: ContributionActivityStatus.ARCHIVED }),
  ];

  return <Accordion items={items} multiple />;
}
