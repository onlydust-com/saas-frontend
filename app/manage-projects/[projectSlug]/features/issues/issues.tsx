import { Plus } from "lucide-react";
import { Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { FilterData } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data";
import { FilterDataProvider } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.context";
import { useContributionsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.hooks";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { GetContributionsPortParams } from "@/core/domain/contribution/contribution-contract.types";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
} from "@/core/domain/contribution/models/contribution.types";
import { GithubOrganizationResponse } from "@/core/domain/github/models/github-organization-model";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { TableSearch } from "@/design-system/molecules/table-search";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { Translate } from "@/shared/translation/components/translate/translate";

import { IssuesProps } from "./issues.types";

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

function Column({
  type,
  queryParams,
  ...kanbanProps
}: {
  type: ContributionActivityStatusUnion;
  queryParams: Partial<GetBiContributorsQueryParams>;
} & Partial<KanbanColumnProps>) {
  const { data, hasNextPage, fetchNextPage } = ContributionReactQueryAdapter.client.useGetContributions({
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
        <div className={"bg-background-primary p-3"} key={contribution.id}>
          <ContributionBadge
            type={contribution.type}
            githubStatus={contribution.githubStatus}
            number={contribution.githubNumber}
          />
          {contribution.githubTitle}
        </div>
      ))}
    </KanbanColumn>
  );
}

export function Issues(_: IssuesProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { open: openFilterPanel } = useContributionsFilterDataSidePanel();
  const filtersCount = Object.keys(filters)?.length;

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

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
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <Button
            variant={"secondary"}
            size="sm"
            startIcon={{ component: Filter }}
            iconOnly={!filtersCount}
            onClick={() => openFilterPanel()}
            classNames={{
              content: "w-fit",
            }}
            endContent={filtersCount ? <Badge size={"xxs"}>{filtersCount}</Badge> : undefined}
          />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        </nav>
        <div className={"h-full overflow-hidden"}>
          <Kanban>
            <Column
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
            <Column type={ContributionActivityStatus.IN_PROGRESS} queryParams={queryParams} />
            <Column type={ContributionActivityStatus.TO_REVIEW} queryParams={queryParams} />
            <Column type={ContributionActivityStatus.DONE} queryParams={queryParams} />
            <Column type={ContributionActivityStatus.ARCHIVED} queryParams={queryParams} />
          </Kanban>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
