import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";

import { useFilterColumns } from "./components/filter-columns/filter-columns.hooks";

export function ProjectsTable() {
  const { columns } = useFilterColumns();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    MeReactQueryAdapter.client.useGetMyProjectsAsContributor({});

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    <div>
      <ScrollView direction={"x"}>
        <Table
          table={table}
          header={{
            headerGroups: table.getHeaderGroups(),
          }}
          rows={table.getRowModel().rows}
          // onRowClick={row => {
          //   router.push(NEXT_ROUTER.manageProjects.details.root(row.original.slug));
          // }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </div>
  );
}
