import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { ExportCsv } from "@/app/data/deep-dive/_features/contributors-table/_components/export-csv/export-csv";
import { FilterColumns } from "@/app/data/deep-dive/_features/contributors-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/data/deep-dive/_features/contributors-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/app/data/deep-dive/_features/contributors-table/_components/filter-data/filter-data";
import { useContributorFilterDataSidePanel } from "@/app/data/deep-dive/_features/contributors-table/_components/filter-data/filter-data.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { GetBiContributorsPortParams, GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { PeriodFilter } from "@/shared/features/filters/period-filter/period-filter";
import { PeriodValue } from "@/shared/features/filters/period-filter/period-filter.types";
import { ProgramEcosystemPopover } from "@/shared/features/popovers/program-ecosystem-popover/program-ecosystem-popover";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

export type ContributorsTableFilters = Omit<
  NonNullable<GetBiContributorsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function ContributorsTable() {
  const { open: openFilterPanel } = useContributorFilterDataSidePanel();
  const [selectedProgramAndEcosystem, setSelectedProgramAndEcosystem] = useState<string[]>([]);
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [filters, setFilters] = useState<ContributorsTableFilters>({});
  const [period, setPeriod] = useState<PeriodValue>();

  const { user, isLoading: isLoadingUser, isError: isErrorUser } = useAuthUser();
  const userProgramIds = user?.programs?.map(program => program.id) ?? [];
  const userEcosystemIds = user?.ecosystems?.map(ecosystem => ecosystem.id) ?? [];
  const { open: openContributor } = useContributorSidePanel();

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    dataSourceIds: selectedProgramAndEcosystem.length
      ? selectedProgramAndEcosystem
      : [...userProgramIds, ...userEcosystemIds],
    search: debouncedSearch,
    fromDate: period?.fromDate,
    toDate: period?.toDate,
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
      showFilteredKpis: false,
      contributionStatuses: ["COMPLETED"],
    },
    options: {
      enabled: Boolean(user),
    },
  });

  function handleOnPeriodChange({ fromDate, toDate }: PeriodValue) {
    setPeriod({ fromDate, toDate });
  }

  const isLoading = isLoadingUser || isLoadingBiContributors;
  const isError = isErrorUser || isErrorBiContributors;

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber, [data]);

  const { columns, selectedIds, setSelectedIds } = useFilterColumns();

  const table = useReactTable({
    data: contributors,
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
      <div className={"grid gap-lg"}>
        <nav className={"flex gap-md"}>
          <ProgramEcosystemPopover
            name={"programAndEcosystem"}
            onSelect={setSelectedProgramAndEcosystem}
            selectedProgramsEcosystems={selectedProgramAndEcosystem}
            buttonProps={{ size: "sm" }}
          />
          <FilterButton onClick={openFilterPanel} />
          <PeriodFilter onChange={handleOnPeriodChange} />
          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
          <ExportCsv queryParams={queryParams} />
        </nav>
        <ScrollView direction={"x"}>
          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
            classNames={{
              base: "min-w-[1200px]",
            }}
            onRowClick={row => {
              openContributor({ login: row.original.contributor.login });
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
