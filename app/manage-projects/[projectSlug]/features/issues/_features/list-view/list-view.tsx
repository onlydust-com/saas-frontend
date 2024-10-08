import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
} from "@/core/domain/contribution/models/contribution.types";

import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ListViewProps } from "./list-view.types";

function useAccordionItem({
  type,
  queryParams,
  onOpenSandboxPanel,
}: {
  type: ContributionActivityStatusUnion;
  queryParams: Partial<GetBiContributorsQueryParams>;
  onOpenSandboxPanel(id: string): void;
}): AccordionItemProps {
  const { data, hasNextPage, fetchNextPage, isLoading } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      ...queryParams,
      statuses: [type],
    },
  });

  const contributions = data?.pages.flatMap(page => page.contributions) || [];

  const title = useMemo(() => {
    switch (type) {
      case ContributionActivityStatus.NOT_ASSIGNED:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.notAssigned"} />;
      case ContributionActivityStatus.IN_PROGRESS:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.inProgress"} />;
      case ContributionActivityStatus.TO_REVIEW:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.toReview"} />;
      case ContributionActivityStatus.DONE:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.done"} />;
      case ContributionActivityStatus.ARCHIVED:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.archive"} />;
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
          <CardContributionKanban contribution={contribution} key={contribution.id} onAction={onOpenSandboxPanel} />
        ))}

        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isLoading} /> : null}
      </>
    ),
  };
}

export function ListView({ queryParams, onOpenSandboxPanel }: ListViewProps) {
  const items = [
    useAccordionItem({ type: ContributionActivityStatus.NOT_ASSIGNED, queryParams, onOpenSandboxPanel }),
    useAccordionItem({ type: ContributionActivityStatus.IN_PROGRESS, queryParams, onOpenSandboxPanel }),
    useAccordionItem({ type: ContributionActivityStatus.TO_REVIEW, queryParams, onOpenSandboxPanel }),
    useAccordionItem({ type: ContributionActivityStatus.DONE, queryParams, onOpenSandboxPanel }),
    useAccordionItem({ type: ContributionActivityStatus.ARCHIVED, queryParams, onOpenSandboxPanel }),
  ];

  return (
    <ScrollView>
      <Accordion items={items} multiple />
    </ScrollView>
  );
}
