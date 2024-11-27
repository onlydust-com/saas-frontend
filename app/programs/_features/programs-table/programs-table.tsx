import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { TABLE_CELL_SIZE, TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellLeads } from "@/shared/features/table/cell/cell-leads/cell-leads";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsTable() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProgramReactQueryAdapter.client.useGetPrograms({});
  const programs = useMemo(() => data?.pages.flatMap(page => page.programs) ?? [], [data]);
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const router = useRouter();
  const columnHelper = createColumnHelper<ProgramListItemInterface>();

  // TODO: Update table to the new configuration
  const columns = [
    columnHelper.accessor("name", {
      enableSorting: false,
      header: () => <Translate token={"programs:list.content.table.columns.programName"} />,
      cell: info => (
        <Typo size={"sm"} weight={"medium"} color="secondary">
          {info.getValue()}
        </Typo>
      ),
    }),
    columnHelper.accessor("leads", {
      enableSorting: false,
      header: () => <Translate token={"programs:list.content.table.columns.programLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        return <CellLeads leads={leads} />;
      },
    }),
    columnHelper.accessor("totalAvailable", {
      enableSorting: false,
      header: () => <Translate token={"programs:list.content.table.columns.budgetsAvailable"} />,
      cell: info => {
        const value = info.getValue();
        return <CellBudget totalUsdEquivalent={value?.totalUsdEquivalent} totalPerCurrency={value?.totalPerCurrency} />;
      },
    }),
    columnHelper.accessor("projectCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.SM,
      minSize: TABLE_CELL_SIZE.SM,
      header: () => <Translate token={"programs:list.content.table.columns.projects"} />,
      cell: info => {
        return <TableCellKpi>{info.getValue()}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("totalGranted", {
      enableSorting: false,
      header: () => <Translate token={"programs:list.content.table.columns.granted"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue().totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
          options: {
            notation: "compact",
          },
          uppercase: true,
        });

        return (
          <TableCellKpi>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    columnHelper.accessor("totalRewarded", {
      enableSorting: false,
      header: () => <Translate token={"programs:list.content.table.columns.rewarded"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue().totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
          options: {
            notation: "compact",
          },
          uppercase: true,
        });

        return (
          <TableCellKpi>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      enableResizing: false,
      header: () => <Translate token={"programs:list.content.table.columns.actions"} />,
      cell: info => (
        <Button
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.programs.projects.root(info.row.original.id) }}
          variant={"secondary"}
          size={"sm"}
        >
          <Translate token={"programs:list.content.table.rows.seeProgram"} />
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: programs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: TABLE_DEFAULT_COLUMN,
    columnResizeMode: "onChange",
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
    <ScrollView direction={"all"}>
      <Table
        table={table}
        header={{
          headerGroups: table.getHeaderGroups(),
        }}
        rows={table.getRowModel().rows}
        onRowClick={row => {
          router.push(NEXT_ROUTER.programs.projects.root(row.original.id));
        }}
      />
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </ScrollView>
  );
}
