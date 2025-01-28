import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useFilterColumns } from "@/app/(saas)/manage-projects/_features/projects-table/components/filter-columns/filter-columns.hooks";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

export function ProjectsTable() {
  const { columns } = useFilterColumns();
  const router = useRouter();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    MeReactQueryAdapter.client.useGetMyProjectsAsMaintainer({});
  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber, [data]);

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
      <PosthogCaptureOnMount
        eventName={"maintainer_projects_list_viewed"}
        params={{
          projects_count: totalItemNumber,
        }}
        paramsReady={Boolean(totalItemNumber)}
      />
      <ScrollView direction={"x"}>
        <Table
          table={table}
          header={{
            headerGroups: table.getHeaderGroups(),
          }}
          rows={table.getRowModel().rows}
          onRowClick={row => {
            router.push(NEXT_ROUTER.manageProjects.default.root(row.original.slug));
          }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </div>
  );
}
