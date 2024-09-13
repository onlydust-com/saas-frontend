import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Translate } from "@/shared/translation/components/translate/translate";

export function SponsorsTable() {
  const { user, isLoading, isError } = useAuthUser();
  const sponsors = user?.sponsors ?? [];
  const router = useRouter();
  const columnHelper = createColumnHelper<{ name: string; id: string }>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <Translate token={"financials:list.content.table.columns.sponsorName"} />,
      cell: info => (
        <Typo size={"sm"} weight={"medium"} color="secondary">
          {info.getValue()}
        </Typo>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => (
        <div className={"flex w-full justify-end"}>
          <Translate token={"financials:list.content.table.columns.actions"} />
        </div>
      ),
      cell: info => (
        <div className={"flex w-full justify-end"}>
          <Button
            as={BaseLink}
            htmlProps={{ href: NEXT_ROUTER.financials.details.root(info.row.original.id) }}
            variant={"secondary"}
            size={"sm"}
          >
            <Translate token={"financials:list.content.table.rows.seeSponsor"} />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: sponsors,
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
        onRowClick={row => {
          router.push(NEXT_ROUTER.financials.details.root(row.original.id));
        }}
        classNames={{
          base: "min-w-[1200px]",
        }}
      />
    </ScrollView>
  );
}
