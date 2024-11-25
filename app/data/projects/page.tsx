"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ContributorsTableFilters } from "@/app/data/contributors/page";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiProjectsPortParams, GetBiProjectsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { DateRangeType } from "@/core/kernel/date/date-facade-port";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { PeriodFilter } from "@/shared/features/filters/period-filter/period-filter";
import { PeriodValue } from "@/shared/features/filters/period-filter/period-filter.types";
import { ProgramEcosystemPopover } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useProjectSidePanel } from "@/shared/panels/project-sidepanel/project-sidepanel.hooks";

import { ExportCsv } from "./_components/export-csv/export-csv";
import { FilterColumns } from "./_components/filter-columns/filter-columns";
import { useFilterColumns } from "./_components/filter-columns/filter-columns.hooks";
import { FilterData } from "./_components/filter-data/filter-data";
import { useProjectFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type ProjectTableFilters = Omit<NonNullable<GetBiProjectsPortParams["queryParams"]>, "pageSize" | "pageIndex">;

function DataProjectsPage() {
  const { open: openFilterPanel } = useProjectFilterDataSidePanel();
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [period, setPeriod] = useState<PeriodValue>();
  const [filters, setFilters] = useState<ProjectTableFilters>({});
  const { open: openProject } = useProjectSidePanel();
  const searchParams = useSearchParams();

  const dateRangeTypeParam = useMemo(() => {
    return searchParams.get("dateRangeType") as DateRangeType;
  }, [searchParams]);

  const plotPeriodParam = useMemo(() => {
    return {
      fromDate: searchParams.get("plotPeriodFrom") ?? undefined,
      toDate: searchParams.get("plotPeriodTo") ?? undefined,
    };
  }, [searchParams]);

  useEffect(() => {
    const seriesName = searchParams.get("seriesName")?.toUpperCase();
    if (seriesName) {
      setFilters({ engagementStatuses: seriesName as unknown as ContributorsTableFilters["engagementStatuses"] });
    }
  }, [searchParams]);

  useEffect(() => {
    const programAndEcosystemParamIds = searchParams.get("programAndEcosystemIds");
    if (programAndEcosystemParamIds) {
      setSelectedProgramAndEcosystem(programAndEcosystemParamIds.split(","));
    }
  }, [searchParams]);

  const { user, isLoading: isLoadingUser, isError: isErrorUser } = useAuthUser();
  const userProgramIds = user?.programs?.map(program => program.id) ?? [];
  const userEcosystemIds = user?.ecosystems?.map(ecosystem => ecosystem.id) ?? [];

  const { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams } = useFilterColumns();

  const queryParams: Partial<GetBiProjectsQueryParams> = {
    dataSourceIds: selectedProgramAndEcosystem.length
      ? selectedProgramAndEcosystem
      : [...userProgramIds, ...userEcosystemIds],
    search: debouncedSearch,
    fromDate: period?.fromDate,
    toDate: period?.toDate,
    ...filters,
    ...sortingParams,
  };

  const {
    data,
    isLoading: isLoadingBiProjects,
    isError: isErrorBiProjects,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiProjects({
    queryParams,
    options: {
      enabled: Boolean(user),
    },
  });

  function handleOnPeriodChange({ fromDate, toDate }: PeriodValue) {
    setPeriod({ fromDate, toDate });
  }

  const isLoading = isLoadingUser || isLoadingBiProjects;
  const isError = isErrorUser || isErrorBiProjects;

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber, [data]);

  const table = useReactTable({
    data: projects,
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
          <ProgramEcosystemPopover
            name={"programAndEcosystem"}
            onSelect={setSelectedProgramAndEcosystem}
            selectedProgramsEcosystems={selectedProgramAndEcosystem}
            buttonProps={{ size: "sm" }}
            searchParams={"programAndEcosystemIds"}
          />
          <FilterButton onClick={openFilterPanel} />
          <PeriodFilter
            onChange={handleOnPeriodChange}
            value={{ fromDate: plotPeriodParam?.fromDate, toDate: plotPeriodParam?.toDate }}
            dateRangeType={dateRangeTypeParam}
          />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
          <ExportCsv queryParams={queryParams} />
        </nav>
        <ScrollView direction={"all"}>
          <Table
            table={table}
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            onRowClick={row => {
              openProject({ projectId: row.original.project.id });
            }}
          />
          {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
        </ScrollView>
        <div className="flex gap-2">
          <Typo size={"sm"} color={"secondary"} translate={{ token: "data:deepDive.projectsTable.projectCount" }} />
          <Typo size={"sm"} color={"primary"}>
            {totalItemNumber}
          </Typo>
        </div>
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}

export default withClientOnly(withAuthenticationRequired(DataProjectsPage));
