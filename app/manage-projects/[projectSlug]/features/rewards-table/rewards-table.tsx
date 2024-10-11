import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useFilterColumns } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-data/filter-data";
import { FilterDataProvider } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-data/filter-data.context";
import { useProjectRewardsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-data/filter-data.hooks";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { GetProjectRewardsPortParams, GetProjectRewardsQueryParams } from "@/core/domain/reward/reward-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";

export type RewardsTableFilters = Omit<
  NonNullable<GetProjectRewardsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function RewardsTable() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { open: openFilterPanel } = useProjectRewardsFilterDataSidePanel();
  const [filters, setFilters] = useState<RewardsTableFilters>({});

  const queryParams: Partial<GetProjectRewardsQueryParams> = {
    sort: "REQUESTED_AT",
    ...filters,
  };

  const {
    data: projectData,
    isLoading: isLoadingProjectData,
    isError: isErrorProjectData,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const {
    data: projectRewardsData,
    isLoading: isLoadingProjectRewardsData,
    isError: isErrorProjectRewardsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = RewardReactQueryAdapter.client.useGetProjectRewards({
    pathParams: {
      projectId: projectData?.id ?? "",
    },
    queryParams,
    options: {
      enabled: Boolean(projectData?.id),
    },
  });

  const isLoading = isLoadingProjectData || isLoadingProjectRewardsData;
  const isError = isErrorProjectData || isErrorProjectRewardsData;

  const rewards = useMemo(() => projectRewardsData?.pages.flatMap(page => page.rewards) ?? [], [projectRewardsData]);
  const totalItemNumber = useMemo(() => projectRewardsData?.pages[0].totalItemNumber, [projectRewardsData]);

  const { columns } = useFilterColumns();

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
        </nav>
        <ScrollView direction={"x"}>
          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            // TODO handle reward detail sidepanel
            // onRowClick={row => {
            //   openRewardDetail({ ..... });
            // }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
        <div className="flex gap-2">
          <Typo
            size={"sm"}
            color={"secondary"}
            translate={{ token: "manageProjects:detail.rewardsTable.rewardsCount" }}
          />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}
