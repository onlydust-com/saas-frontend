import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { useEditProgramPanel } from "@/app/(saas)/financials/[sponsorId]/programs/_features/edit-program-panel/edit-program-panel.hooks";
import { ProgramsTableProps } from "@/app/(saas)/financials/[sponsorId]/programs/_features/programs-table/programs-table.types";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";
import { SponsorProgramsListItemInterface } from "@/core/domain/sponsor/models/sponsor-program-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_CELL_SIZE, TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellLeads } from "@/shared/features/table/cell/cell-leads/cell-leads";
import { useAllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { useProgramSidePanel } from "@/shared/panels/program-sidepanel/program-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsTable({ sponsorId }: ProgramsTableProps) {
  const { open: openEditProgram } = useEditProgramPanel();
  const { open: openProgram } = useProgramSidePanel();
  const { open: openAllocateProgramSidepanel } = useAllocateProgramSidepanel();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    SponsorReactQueryAdapter.client.useGetSponsorPrograms({
      pathParams: { sponsorId },
    });

  const { data: sponsor } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  const programs = useMemo(() => data?.pages.flatMap(page => page.programs) ?? [], [data]);
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const canAllocatePrograms = Boolean(sponsor?.totalAvailable.totalUsdEquivalent);

  const columnHelper = createColumnHelper<SponsorProgramsListItemInterface>();

  function handleOpenAllocateProgram(programId: string) {
    openAllocateProgramSidepanel({ programId, sponsorId });
  }

  function handleOpenProgram(programId: string) {
    openProgram({
      programId,
      onEditClick: (id: string) => openEditProgram({ programId: id, sponsorId }),
      onAllocateClick: (id: string) => handleOpenAllocateProgram(id),
    });
  }

  // TODO: Update table to the new configuration
  const columns = [
    columnHelper.accessor("name", {
      enableSorting: false,
      header: () => <Translate token={"financials:details.programs.table.columns.programName"} />,
      cell: info => (
        <Typo size={"sm"} weight={"medium"} color="secondary" classNames={{ base: "whitespace-nowrap" }}>
          {info.getValue()}
        </Typo>
      ),
    }),
    columnHelper.accessor("leads", {
      enableSorting: false,
      header: () => <Translate token={"financials:details.programs.table.columns.programLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        return <CellLeads leads={leads} />;
      },
    }),
    columnHelper.accessor("totalAvailable", {
      enableSorting: false,
      header: () => <Translate token={"financials:details.programs.table.columns.budgetsAvailable"} />,
      cell: info => {
        const value = info.getValue();

        return <CellBudget totalUsdEquivalent={value?.totalUsdEquivalent} totalPerCurrency={value?.totalPerCurrency} />;
      },
    }),
    columnHelper.accessor("projectCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXS,
      minSize: TABLE_CELL_SIZE.XXS,
      header: () => <Translate token={"financials:details.programs.table.columns.projects"} />,
      cell: info => {
        return <TableCellKpi>{info.getValue()}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("totalGranted", {
      enableSorting: false,
      header: () => <Translate token={"financials:details.programs.table.columns.granted"} />,
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
    columnHelper.accessor("totalAllocated", {
      enableSorting: false,
      header: () => <Translate token={"financials:details.programs.table.columns.allocated"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info?.getValue()?.totalUsdEquivalent,
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
      size: TABLE_CELL_SIZE.XXL,
      minSize: TABLE_CELL_SIZE.XXL,
      header: () => <Translate token={"financials:details.programs.table.columns.actions"} />,
      cell: info => {
        return (
          <div className={"flex gap-1"}>
            <Tooltip
              content={<Translate token={"financials:details.programs.table.rows.allocate.tooltip"} />}
              enabled={!canAllocatePrograms}
            >
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => {
                  handleOpenAllocateProgram(info.row.original.id);
                }}
                isDisabled={!canAllocatePrograms}
                translate={{ token: "financials:details.programs.table.rows.allocate.button" }}
              />
            </Tooltip>

            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => handleOpenProgram(info.row.original.id)}
              translate={{ token: "financials:details.programs.table.rows.seeProgram" }}
            />

            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => openEditProgram({ programId: info.row.original.id, sponsorId })}
              translate={{ token: "financials:details.programs.table.rows.editProgram" }}
            />
          </div>
        );
      },
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
    return <ErrorState />;
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
          handleOpenProgram(row.original.id);
        }}
        emptyState={{
          message: "financials:details.programs.table.emptyState.message",
        }}
      />
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </ScrollView>
  );
}
