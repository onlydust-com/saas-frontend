import { Plus } from "lucide-react";
import { Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { FilterData } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data";
import { FilterDataProvider } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.context";
import { useContributionsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.hooks";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { GetContributionsPortParams } from "@/core/domain/contribution/contribution-contract.types";
import { GithubOrganizationResponse } from "@/core/domain/github/models/github-organization-model";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { TableSearch } from "@/design-system/molecules/table-search";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { Translate } from "@/shared/translation/components/translate/translate";

import { IssuesKanbanColumns, IssuesProps } from "./issues.types";

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

function Column({ type, ...kanbanProps }: { type: IssuesKanbanColumns } & Partial<KanbanColumnProps>) {
  const title = useMemo(() => {
    switch (type) {
      case IssuesKanbanColumns.notAssigned:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.notAssigned"} />;
      case IssuesKanbanColumns.inProgress:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.inProgress"} />;
      case IssuesKanbanColumns.toReview:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.toReview"} />;
      case IssuesKanbanColumns.done:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.done"} />;
      case IssuesKanbanColumns.archive:
        return <Translate token={"manageProjects:detail.contributions.kanban.columns.archive"} />;
    }
  }, [type]);

  // TODO : Make request base on type
  // Loop over issues

  return (
    <KanbanColumn
      {...kanbanProps}
      header={{
        title,
        badge: { children: "12" },
        ...(kanbanProps.header || {}),
      }}
    />
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
              type={IssuesKanbanColumns.notAssigned}
              header={{
                endContent: (
                  <Menu isPopOver={true} closeOnSelect items={createMenuItems(data?.getProjectRepos() || [])}>
                    <Button iconOnly variant={"secondary"} size="sm" startIcon={{ component: Plus }} />
                  </Menu>
                ),
              }}
            />
            <Column type={IssuesKanbanColumns.inProgress} />
            <Column type={IssuesKanbanColumns.toReview} />
            <Column type={IssuesKanbanColumns.done} />
            <Column type={IssuesKanbanColumns.archive} />
          </Kanban>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
