import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
  ContributionAs,
} from "@/core/domain/contribution/models/contribution.types";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Translate } from "@/shared/translation/components/translate/translate";

import { KanbanViewProps } from "./kanban-view.types";

function Column({
  type,
  queryParams,
  onOpenContribution,
  ...kanbanProps
}: {
  type: ContributionActivityStatusUnion;
  queryParams: Partial<GetContributionsQueryParams>;
  onOpenContribution(id: string): void;
} & Partial<KanbanColumnProps>) {
  const { githubUserId } = useAuthUser();
  const applicantIds = githubUserId ? [githubUserId] : [];
  const contributorIds = githubUserId ? [githubUserId] : [];
  const ids = type == ContributionActivityStatus.NOT_ASSIGNED ? { applicantIds } : { contributorIds };
  const statuses = [type];

  const { data, hasNextPage, fetchNextPage, isPending, isFetchingNextPage } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        ...ids,
        statuses,
      },
      options: {
        enabled: Boolean(githubUserId),
      },
    });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  const title = useMemo(() => {
    switch (type) {
      case ContributionActivityStatus.NOT_ASSIGNED:
        return <Translate token={"myDashboard:detail.activity.kanban.columns.applied"} />;
      case ContributionActivityStatus.IN_PROGRESS:
        return <Translate token={"myDashboard:detail.activity.kanban.columns.assignedIssue"} />;
      case ContributionActivityStatus.TO_REVIEW:
        return <Translate token={"myDashboard:detail.activity.kanban.columns.pendingReview"} />;
      case ContributionActivityStatus.DONE:
        return <Translate token={"myDashboard:detail.activity.kanban.columns.complete"} />;
    }
  }, [type]);

  return (
    <KanbanColumn
      {...kanbanProps}
      hasNextPage={hasNextPage}
      onNext={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      header={{
        title,
        badge: { children: data?.pages?.[0]?.totalItemNumber ?? "0" },
        ...(kanbanProps.header || {}),
      }}
    >
      {contributions?.map(contribution => (
        <CardContributionKanban
          key={contribution.id}
          contribution={contribution}
          onAction={onOpenContribution}
          showContributors={false}
          as={ContributionAs.CONTRIBUTOR}
          showProject
        />
      ))}
      {isPending && (
        <>
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
        </>
      )}
    </KanbanColumn>
  );
}

export function KanbanView({ queryParams, onOpenContribution }: KanbanViewProps) {
  return (
    <Kanban>
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.NOT_ASSIGNED}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.IN_PROGRESS}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.TO_REVIEW}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.DONE}
        queryParams={queryParams}
      />
    </Kanban>
  );
}
