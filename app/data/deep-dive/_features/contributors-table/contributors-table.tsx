import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorsTable() {
  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiContributors({});

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);

  const columnHelper = createColumnHelper<BiContributorInterface>();

  const columns = [
    columnHelper.accessor("contributor.id", {
      header: () => <Translate token={"financials:list.content.table.columns.sponsorName"} />,
      cell: info => (
        <Typo size={"sm"} weight={"medium"} color="secondary">
          {info.getValue()}
        </Typo>
      ),
    }),
  ];

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
    <ScrollView direction={"x"}>
      <Table
        header={{
          headerGroups: table.getHeaderGroups(),
        }}
        rows={table.getRowModel().rows}
        // onRowClick={row => {}}
        classNames={{
          base: "min-w-[1200px]",
        }}
      />
    </ScrollView>
  );
}
