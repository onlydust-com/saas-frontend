import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
} from "@/core/domain/contribution/models/contribution.types";
import { GithubOrganizationResponse } from "@/core/domain/github/models/github-organization-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
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
  const { data, hasNextPage, fetchNextPage, isPending } = ContributionReactQueryAdapter.client.useGetContributions({
    queryParams: {
      ...queryParams,
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
        return <Translate token={"manageProjects:detail.activity.kanban.columns.archived"} />;
    }
  }, [type]);

  return (
    <KanbanColumn
      {...kanbanProps}
      hasNextPage={hasNextPage}
      onNext={fetchNextPage}
      header={{
        title,
        badge: { children: data?.pages?.[0]?.totalItemNumber ?? "0" },
        ...(kanbanProps.header || {}),
      }}
    >
      {contributions?.map(contribution => (
        <CardContributionKanban contribution={contribution} key={contribution.id} onAction={onOpenContribution} />
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
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const createMenuItems = (repos: GithubOrganizationResponse["repos"]): MenuItemPort<number>[] => {
    return repos.map(repo => ({
      id: repo.id,
      label: <BaseLink href={`${repo.htmlUrl}/issues/new`}>{repo.name}</BaseLink>,
    }));
  };

  return (
    <Kanban>
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.NOT_ASSIGNED}
        header={{
          endContent: (
            <Menu isPopOver={true} closeOnSelect items={createMenuItems(data?.getProjectRepos() || [])}>
              <Button iconOnly variant={"secondary"} size="sm" startIcon={{ component: Plus }} />
            </Menu>
          ),
        }}
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
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.ARCHIVED}
        queryParams={queryParams}
      />
    </Kanban>
  );
}
