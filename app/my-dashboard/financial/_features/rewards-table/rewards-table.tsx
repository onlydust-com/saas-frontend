import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { FilterColumns } from "@/app/my-dashboard/financial/_features/rewards-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/my-dashboard/financial/_features/rewards-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/my-dashboard/financial/_features/rewards-table/_components/filter-data/filter-data";
import { useProjectRewardsFilterDataSidePanel } from "@/app/my-dashboard/financial/_features/rewards-table/_components/filter-data/filter-data.hooks";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { GetRewardsPortParams, GetRewardsQueryParams } from "@/core/domain/reward/reward-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useRewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.hooks";

export type RewardsTableFilters = Omit<NonNullable<GetRewardsPortParams["queryParams"]>, "pageSize" | "pageIndex">;

export function RewardsTable() {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { open: openFilterPanel } = useProjectRewardsFilterDataSidePanel();
  const { open } = useRewardDetailSidepanel();
  const [filters, setFilters] = useState<RewardsTableFilters>({});
  const { githubUserId } = useAuthUser();

  const { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams } = useFilterColumns();

  const queryParams: Partial<GetRewardsQueryParams> = {
    search: debouncedSearch,
    ...filters,
    ...sortingParams,
    recipientIds: githubUserId ? [githubUserId] : undefined,
  };

  const {
    data: rewardsData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams,
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  const rewards = useMemo(() => rewardsData?.pages.flatMap(page => page.rewards) ?? [], [rewardsData]);
  const totalItemNumber = useMemo(() => rewardsData?.pages[0].totalItemNumber, [rewardsData]);

  const table = useReactTable({
    data: rewards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    sortDescFirst: false,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    defaultColumn: TABLE_DEFAULT_COLUMN,
    columnResizeMode: "onChange",
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </nav>
        <ScrollView direction={"x"}>
          <Table
            table={table}
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            onRowClick={row => {
              open({ rewardId: row.original.id });
            }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
        <div className="flex gap-2">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "myDashboard:detail.rewardsTable.rewardsCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
