import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { useFilterColumns } from "@/app/maintainer/features/projects-table/components/filter-columns/filter-columns.hooks";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";

export function ProjectsTable() {
  const { columns } = useFilterColumns();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjects({});
  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const table = useReactTable({
    data: projects,
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
    <div>
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
          //   openProject({ projectId: row.original.project.id });
          // }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </div>
  );
}
