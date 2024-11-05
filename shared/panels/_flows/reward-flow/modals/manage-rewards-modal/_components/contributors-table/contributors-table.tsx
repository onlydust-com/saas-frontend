import { RowSelectionState, Updater, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { BulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation";
import { FilterColumns } from "@/shared/panels/_flows/reward-flow/modals/manage-rewards-modal/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/shared/panels/_flows/reward-flow/modals/manage-rewards-modal/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/shared/panels/_flows/reward-flow/modals/manage-rewards-modal/_components/filter-data/filter-data";
import { useContributorsFilterDataSidePanel } from "@/shared/panels/_flows/reward-flow/modals/manage-rewards-modal/_components/filter-data/filter-data.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { ContributorsTableProps } from "./contributors-table.types";

export type ContributorsTableFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function ContributorsTable({ projectId }: ContributorsTableProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { open: openFilterPanel } = useContributorsFilterDataSidePanel();
  const { selectedGithubUserIds, addContributorId, removeContributorId } = useRewardFlow();
  const { open: openBulkContributionSelection } = useBulkContributionSelection();

  const [search, setSearch] = useState<string>();
  const [filters, setFilters] = useState<ContributorsTableFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams } = useFilterColumns({ projectId });

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    ...filters,
    ...sortingParams,
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    BiReactQueryAdapter.client.useGetBiContributors({
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

  const { data: selectedData, isLoading: isLoadingSelectedContributors } =
    BiReactQueryAdapter.client.useGetBiContributors({
      queryParams: {
        contributorIds: selectedGithubUserIds,
        projectSlugs: [projectSlug],
        pageSize: selectedGithubUserIds?.length ?? undefined,
      },
    });

  const allContributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);
  const selectedContributors = useMemo(
    () => selectedData?.pages.flatMap(page => page.contributors) ?? [],
    [selectedData]
  );

  const contributors = useMemo(() => {
    const filteredContributors = allContributors.filter(contributor => {
      return !selectedContributors.find(
        selectedContributor => selectedContributor.contributor.githubUserId === contributor.contributor.githubUserId
      );
    });

    return [...selectedContributors, ...filteredContributors];
  }, [allContributors, selectedContributors]);

  const initialSelectedRowIds = useMemo(() => {
    return contributors.reduce((acc, contributor) => {
      if (selectedGithubUserIds.includes(contributor.contributor.githubUserId)) {
        acc[contributor.contributor.githubUserId] = true;
      }
      return acc;
    }, {} as RowSelectionState);
  }, [contributors, selectedGithubUserIds]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(initialSelectedRowIds);

  useEffect(() => {
    setRowSelection(initialSelectedRowIds);
  }, [initialSelectedRowIds]);

  const table = useReactTable({
    data: contributors,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.contributor.githubUserId.toString(),
    onRowSelectionChange: (selection: Updater<RowSelectionState>) => {
      const updatedSelection = typeof selection === "function" ? selection(rowSelection) : selection;

      const addedContributors = Object.keys(updatedSelection)
        .filter(id => updatedSelection[id] && !rowSelection[id])
        .map(id => parseInt(id));

      const removedContributors = Object.keys(rowSelection)
        .filter(id => !updatedSelection[id] && rowSelection[id])
        .map(id => parseInt(id));

      addedContributors.forEach(id => addContributorId(id));
      removedContributors.forEach(id => removeContributorId(id));

      setRowSelection(updatedSelection);
      return updatedSelection;
    },
    manualSorting: true,
    sortDescFirst: false,
    onSortingChange: setSorting,
    state: {
      rowSelection,
      sorting,
    },
  });

  useEffect(() => {
    openBulkContributionSelection();
  }, []);

  if (isLoading || isLoadingSelectedContributors) {
    return <TableLoading />;
  }

  if (isError) {
    return (
      <div className={"py-24 text-center"}>
        <Typo
          translate={{
            token: "common:state.error.title",
          }}
        />
      </div>
    );
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </nav>

        <ScrollView>
          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            classNames={{
              base: "min-w-[1200px]",
            }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
      </div>

      <FilterData />
      <BulkContributionSelection
        headerProps={{
          canGoBack: false,
          canClose: false,
        }}
        footerProps={{
          hideFullPage: true,
        }}
      />
      <BulkContributionValidation />
    </FilterDataProvider>
  );
}
