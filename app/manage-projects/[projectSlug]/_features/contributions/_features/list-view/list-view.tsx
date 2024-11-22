import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
  ContributionAs,
} from "@/core/domain/contribution/models/contribution.types";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ListViewProps } from "./list-view.types";

function useAccordionItem({
  type,
  queryParams,
  onOpenContribution,
}: {
  type: ContributionActivityStatusUnion;
  queryParams: Partial<GetContributionsQueryParams>;
  onOpenContribution(id: string): void;
}): AccordionItemProps {
  const { data, hasNextPage, fetchNextPage, isLoading, isPending } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        statuses: [type],
      },
      options: {
        enabled: !!queryParams?.projectSlugs?.length,
      },
    });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

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
        return <Translate token={"manageProjects:detail.activity.kanban.columns.archived"} />;
    }
  }, [type]);

  return {
    id: type,
    titleProps: {
      children: title,
    },
    badgeProps: {
      children: data?.pages?.[0]?.totalItemNumber ?? "0",
    },
    content: (
      <>
        {contributions?.map(contribution => (
          <div key={contribution.githubId} className="!p-none">
            <CardContributionKanban
              contribution={contribution}
              onAction={onOpenContribution}
              as={ContributionAs.MAINTAINER}
              classNames={{
                base: "bg-transparent border-none rounded-none",
              }}
            />
          </div>
        ))}

        {isPending && (
          <>
            <Skeleton classNames={{ base: "h-[100px] w-full" }} />
            <Skeleton classNames={{ base: "h-[100px] w-full" }} />
            <Skeleton classNames={{ base: "h-[100px] w-full" }} />
            <Skeleton classNames={{ base: "h-[100px] w-full" }} />
          </>
        )}

        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isLoading} /> : null}
      </>
    ),
  };
}

export function ListView({ queryParams, onOpenContribution }: ListViewProps) {
  const items = [
    useAccordionItem({ type: ContributionActivityStatus.NOT_ASSIGNED, queryParams, onOpenContribution }),
    useAccordionItem({ type: ContributionActivityStatus.IN_PROGRESS, queryParams, onOpenContribution }),
    useAccordionItem({ type: ContributionActivityStatus.TO_REVIEW, queryParams, onOpenContribution }),
    useAccordionItem({ type: ContributionActivityStatus.DONE, queryParams, onOpenContribution }),
    useAccordionItem({ type: ContributionActivityStatus.ARCHIVED, queryParams, onOpenContribution }),
  ];

  return (
    <ScrollView>
      <Accordion items={items} multiple />
    </ScrollView>
  );
}
