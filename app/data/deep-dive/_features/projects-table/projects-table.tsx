import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { FilterColumns } from "@/app/data/deep-dive/_features/projects-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/app/data/deep-dive/_features/projects-table/_components/filter-columns/filter-columns.hooks";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

export function ProjectsTable() {
  const { user, isLoading: isLoadingUser, isError: isErrorUser } = useAuthUser();
  const userProgramIds = user?.programs?.map(program => program.id) ?? [];
  const userEcosystemIds = user?.ecosystems?.map(ecosystem => ecosystem.id) ?? [];

  const {
    data,
    isLoading: isLoadingBiProjects,
    isError: isErrorBiProjects,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiProjects({
    queryParams: {
      programOrEcosystemIds: [...userProgramIds, ...userEcosystemIds],
    },
    options: {
      enabled: Boolean(user),
    },
  });

  const isLoading = isLoadingUser || isLoadingBiProjects;
  const isError = isErrorUser || isErrorBiProjects;

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const { columns, selectedIds, setSelectedIds } = useFilterColumns();

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
    <ScrollView direction={"x"}>
      <div className={"flex"}>
        <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
      </div>
      <Table
        header={{
          headerGroups: table.getHeaderGroups(),
        }}
        rows={table.getRowModel().rows}
        classNames={{
          base: "min-w-[1200px]",
        }}
      />
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </ScrollView>
  );
}
