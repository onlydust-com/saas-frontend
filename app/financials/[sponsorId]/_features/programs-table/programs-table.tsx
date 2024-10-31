import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { useEditProgramPanel } from "@/app/financials/[sponsorId]/_features/edit-program-panel/edit-program-panel.hooks";
import { ProgramsTableProps } from "@/app/financials/[sponsorId]/_features/programs-table/programs-table.types";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";
import { bootstrap } from "@/core/bootstrap";
import { SponsorProgramsListItemInterface } from "@/core/domain/sponsor/models/sponsor-program-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useProgramSidePanel } from "@/shared/panels/program-sidepanel/program-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsTable({ onAllocateClick }: ProgramsTableProps) {
  const { sponsorId } = useParams<{ sponsorId: string }>();
  const { open: OpenEditProgram } = useEditProgramPanel();
  const { open: openProgram } = useProgramSidePanel();

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

  function handleOpenProgram(programId: string) {
    openProgram({
      programId,
      onEditClick: (id: string) => OpenEditProgram({ programId: id, sponsorId }),
      onAllocateClick: (id: string) => onAllocateClick(id),
    });
  }

  const columns = [
    columnHelper.accessor("name", {
      header: () => <Translate token={"financials:details.programs.table.columns.programName"} />,
      cell: info => (
        <Typo size={"sm"} weight={"medium"} color="secondary" classNames={{ base: "whitespace-nowrap" }}>
          {info.getValue()}
        </Typo>
      ),
    }),
    columnHelper.accessor("leads", {
      header: () => <Translate token={"financials:details.programs.table.columns.programLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        if (!leads.length) {
          return "N/A";
        }

        if (leads.length === 1) {
          const lead = leads[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: lead.avatarUrl,
                },
              ]}
              title={{ children: lead.login }}
              description={{ children: <Translate token={"financials:details.programs.table.rows.programLead"} /> }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={leads.map(lead => ({
              src: lead.avatarUrl,
              name: lead.login,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"financials:details.programs.table.rows.leads"} count={leads?.length} />,
            }}
          />
        );
      },
    }),
    columnHelper.accessor("totalAvailable", {
      header: () => <Translate token={"financials:details.programs.table.columns.budgetsAvailable"} />,
      cell: info => {
        const value = info.getValue();

        const totalUsdEquivalent = moneyKernelPort.format({
          amount: value.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        const totalPerCurrency = value.totalPerCurrency ?? [];

        if (!totalPerCurrency.length) {
          return "N/A";
        }

        if (totalPerCurrency.length === 1) {
          const firstCurrency = totalPerCurrency[0];

          const totalFirstCurrency = moneyKernelPort.format({
            amount: firstCurrency.amount,
            currency: moneyKernelPort.getCurrency(firstCurrency.currency.code),
          });

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: firstCurrency.currency.logoUrl,
                },
              ]}
              title={{ children: `${totalFirstCurrency.amount} ${totalFirstCurrency.code}` }}
              description={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={totalPerCurrency?.map(({ currency }) => ({
              src: currency.logoUrl,
              name: currency.name,
            }))}
            quantity={3}
            title={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            description={{
              children: (
                <Translate
                  token={"financials:details.programs.table.rows.currencies"}
                  count={totalPerCurrency?.length}
                />
              ),
            }}
            popoverContent={(totalPerCurrency ?? [])?.map(amount => {
              return (
                <CardBudget
                  key={amount.currency.id}
                  amount={{
                    value: amount.amount,
                    currency: amount.currency,
                    usdEquivalent: amount.usdEquivalent ?? 0,
                  }}
                  background={"secondary"}
                  border={"primary"}
                  badgeProps={{ color: "brand", children: amount.currency.name }}
                />
              );
            })}
          />
        );
      },
    }),
    columnHelper.accessor("projectCount", {
      header: () => <Translate token={"financials:details.programs.table.columns.projects"} />,
      cell: info => {
        return <TableCellKpi>{info.getValue()}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("totalGranted", {
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
    columnHelper.accessor("totalReceived", {
      header: () => <Translate token={"financials:details.programs.table.columns.received"} />,
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
                  onAllocateClick(info.row.original.id);
                }}
                isDisabled={!canAllocatePrograms}
              >
                <Translate token={"financials:details.programs.table.rows.allocate.button"} />
              </Button>
            </Tooltip>

            <Button variant={"secondary"} size={"sm"} onClick={() => handleOpenProgram(info.row.original.id)}>
              <Translate token={"financials:details.programs.table.rows.seeProgram"} />
            </Button>

            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => OpenEditProgram({ programId: info.row.original.id, sponsorId })}
            >
              <Translate token={"financials:details.programs.table.rows.editProgram"} />
            </Button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: programs,
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
        classNames={{
          base: "min-w-[1200px]",
        }}
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
