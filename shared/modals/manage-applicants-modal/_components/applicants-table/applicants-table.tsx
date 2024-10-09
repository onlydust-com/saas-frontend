import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { GetApplicationsQueryParams } from "@/core/domain/application/application-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { FilterColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns.hooks";

export function ApplicantsTable() {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetApplicationsQueryParams> = {
    u: {
      search: debouncedSearch,
    },
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ApplicationReactQueryAdapter.client.useGetApplications({ queryParams });
  const applications = useMemo(() => data?.pages.flatMap(page => page.applications) ?? [], [data]);

  const { columns, selectedIds, setSelectedIds } = useFilterColumns();

  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
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
    <div className={"flex flex-col gap-lg overflow-hidden"}>
      <nav className={"flex gap-md"}>
        <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
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
          // onRowClick={row => {
          //   alert(row.original.id);
          // }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </div>
  );
}
