import { RowSelectionState, Updater, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";

import { FilterColumns } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_components/filter-data/filter-data";
import { useContributorFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_components/filter-data/filter-data.hooks";
import {
  ContributorsTableContext,
  ContributorsTableProvider,
} from "@/app/manage-projects/[projectSlug]/features/contributors-table/contributors-table.context";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

export type ContributorsTableFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

function SafeContributorsTable() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { open: openFilterPanel } = useContributorFilterDataSidePanel();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [filters, setFilters] = useState<ContributorsTableFilters>({});
  const { rowSelection, setRowSelection, setUserSelected } = useContext(ContributorsTableContext);
  const { open: openContributor } = useContributorSidePanel();

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  const {
    data,
    isLoading: isLoadingBiContributors,
    isError: isErrorBiContributors,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      ...queryParams,
      projectSlugs: [projectSlug],
      showFilteredKpis: true,
      contributionStatuses: ["IN_PROGRESS", "COMPLETED"],
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const isLoading = isLoadingBiContributors;
  const isError = isErrorBiContributors;

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber, [data]);

  const { columns, selectedIds, setSelectedIds } = useFilterColumns();

  const table = useReactTable({
    data: contributors,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.contributor.githubUserId.toString(),
    onRowSelectionChange: (selection: Updater<RowSelectionState>) => {
      const selectedIds = typeof selection === "function" ? selection(rowSelection) : selection;

      const selectedContributors = contributors.filter(
        contributor => selectedIds[contributor.contributor.githubUserId]
      );

      setUserSelected(selectedContributors);
      setRowSelection(selection);
      return selection;
    },
    state: {
      rowSelection,
    },
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  const filtersCount = Object.keys(filters)?.length;

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
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </nav>
        <ScrollView direction={"all"}>
          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            classNames={{
              base: "min-w-[1200px]",
            }}
            onRowClick={row => {
              openContributor({ githubId: row.original.contributor.githubUserId });
            }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
        <div className="flex gap-2">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "data:deepDive.projectsTable.contributorCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}

export function ContributorsTable() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  return (
    <ContributorsTableProvider projectSlug={projectSlug}>
      <SafeContributorsTable />
    </ContributorsTableProvider>
  );
}
