import { useReactTable } from "@tanstack/react-table";
import { getCoreRowModel } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetProjectRewardsV2PortParams } from "@/core/domain/project/project-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table } from "@/design-system/molecules/table";
import { TableLoading } from "@/design-system/molecules/table/table.loading";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";

import { useFilterColumns } from "./filter-columns/filter-columns.hooks";

export type RewardsTableFilters = Omit<
  NonNullable<GetProjectRewardsV2PortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function RewardsTable({ params }: { params: { projectSlug: string } }) {
  const [filters, setFilters] = useState<RewardsTableFilters>({});
  const { columns } = useFilterColumns();

  const {
    data: rewardsData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = ProjectReactQueryAdapter.client.useGetProjectRewardsV2({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
  });

  const rewards = useMemo(() => rewardsData?.pages.flatMap(page => page.rewards) ?? [], [rewardsData]);

  const totalItemNumber = useMemo(() => rewardsData?.pages[0].totalItemNumber, [rewardsData]);

  const table = useReactTable({
    data: rewards,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col divide-y divide-border-primary overflow-hidden"}>
        <ScrollView direction={"x"} className="p-lg">
          <Table
            table={table}
            header={{
              headerGroups: table.getHeaderGroups(),
              classNames: {
                base: "bg-transparent relative",
              },
            }}
            rows={table.getRowModel().rows}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
        <div className="flex gap-md p-lg pb-0">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "project:details.rewards.rewardsCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
    </FilterDataProvider>
  );
}
