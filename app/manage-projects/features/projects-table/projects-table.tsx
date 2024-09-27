import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useFilterColumns } from "@/app/manage-projects/features/projects-table/components/filter-columns/filter-columns.hooks";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";

export function ProjectsTable() {
  const { columns } = useFilterColumns();
  const router = useRouter();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    MeReactQueryAdapter.client.useGetMeProjects({});
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
          onRowClick={row => {
            console.log("row", row.original.slug);
            router.push(NEXT_ROUTER.manageProjects.details.root(row.original.slug));
          }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </div>
  );
}
