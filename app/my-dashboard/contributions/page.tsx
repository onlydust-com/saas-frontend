"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { FilterData } from "@/app/my-dashboard/contributions/_features/filter-data/filter-data";
import { useContributorContributionsFilterDataSidePanel } from "@/app/my-dashboard/contributions/_features/filter-data/filter-data.hooks";
import { KanbanView } from "@/app/my-dashboard/contributions/_features/kanban-view/kanban-view";

import {
  GetContributionsPortParams,
  GetContributionsQueryParams,
} from "@/core/domain/contribution/contribution-contract.types";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { TableSearch } from "@/design-system/molecules/table-search";

import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export default function MyDashboardContributionsPage() {
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { open: openFilterPanel } = useContributorContributionsFilterDataSidePanel();
  const { open: openContribution } = useContributionsSidepanel();

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    projectSlugs: projectSlug ? [projectSlug] : undefined,
    types: ["ISSUE", "PULL_REQUEST"],
    sort: "UPDATED_AT",
    sortDirection: "DESC",
    ...filters,
  };

  function onOpenContribution(id: string) {
    openContribution({ id, as: ContributionAs.CONTRIBUTOR });
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />

          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        </nav>

        <div className={"h-full overflow-hidden"}>
          <KanbanView queryParams={queryParams} onOpenContribution={onOpenContribution} />
        </div>
      </div>

      <FilterData />
    </FilterDataProvider>
  );
}
