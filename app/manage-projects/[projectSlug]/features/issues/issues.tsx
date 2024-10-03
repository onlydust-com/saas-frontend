import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

import { ContributorsTableFilters } from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table";
import { FilterData } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data";
import { FilterDataProvider } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.context";
import { useContributionsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.hooks";

import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableSearch } from "@/design-system/molecules/table-search";

import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { Translate } from "@/shared/translation/components/translate/translate";

import { IssuesKanbanColumns, IssuesProps } from "./issues.types";

function Column({ type }: { type: IssuesKanbanColumns }) {
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
      header={{
        title,
        badge: { children: "12" },
      }}
    />
  );
}

export function Issues(_: IssuesProps) {
  // TODO @Mehdi update to ContributionFiltersType once ready
  const [filters, setFilters] = useState<ContributorsTableFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { open: openFilterPanel } = useContributionsFilterDataSidePanel();
  const filtersCount = Object.keys(filters)?.length;

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    ...filters,
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
            <Column type={IssuesKanbanColumns.notAssigned} />
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
