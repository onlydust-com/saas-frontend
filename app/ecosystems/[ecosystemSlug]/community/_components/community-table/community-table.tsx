import { getCoreRowModel } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";
import { GetEcosystemContributorsQueryParams } from "@/core/domain/ecosystem/ecosystem-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";
import { TableLoading } from "@/design-system/molecules/table/table.loading";
import { Table } from "@/design-system/molecules/table/variants/table-default";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";

import { useFilterColumns } from "../filter-columns/filter-columns.hooks";

export function CommunityTable({ ecosystemSlug }: { ecosystemSlug: string }) {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { columns } = useFilterColumns();

  const queryParams: Partial<GetEcosystemContributorsQueryParams> = {
    search: debouncedSearch,
  };

  const {
    data: contributorsData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = EcosystemReactQueryAdapter.client.useGetEcosystemContributors({
    queryParams,
    pathParams: {
      slug: ecosystemSlug,
    },
  });

  const contributors = useMemo(
    () => contributorsData?.pages.flatMap(page => page.contributors) ?? [],
    [contributorsData]
  );

  const totalItemNumber = useMemo(() => contributorsData?.pages[0].totalItemNumber, [contributorsData]);

  const table = useReactTable({
    data: contributors,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="p-lg">
        <TableLoading background="glass" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-lg">
        <ErrorState />;
      </div>
    );
  }

  return (
    <div className={"flex h-full flex-col divide-y divide-border-primary overflow-hidden"}>
      <div className="p-xl">
        <Typo size="xs" color="quaternary" translate={{ token: "ecosystems:details.community.description" }} />
      </div>

      <nav className={"flex gap-md p-lg"}>
        <TableSearch
          value={search}
          onChange={setSearch}
          onDebouncedChange={setDebouncedSearch}
          inputProps={{ isTransparent: true }}
        />
      </nav>
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
      <div className="flex gap-md px-lg pt-xl">
        <Typo size={"sm"} color={"secondary"} translate={{ token: "ecosystems:details.community.communityCount" }} />
        <Typo size={"sm"} color={"primary"}>
          {totalItemNumber}
        </Typo>
      </div>
    </div>
  );
}
