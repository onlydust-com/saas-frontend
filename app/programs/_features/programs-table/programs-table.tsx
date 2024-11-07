import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { CellLeadsAvatars } from "@/shared/features/table/cell/cell-leads-avatars/cell-leads-avatars";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProgramsTable() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProgramReactQueryAdapter.client.useGetPrograms({});
  const programs = useMemo(() => data?.pages.flatMap(page => page.programs) ?? [], [data]);
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const router = useRouter();
  const columnHelper = createColumnHelper<ProgramListItemInterface>();

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

        return (
          <CellLeadsAvatars
            leads={leads}
            singleProps={{
              description: {
                children: <Translate token={"programs:list.content.table.rows.programLead"} />,
              },
            }}
          />
        );
      },
    }),
    columnHelper.accessor("totalAvailable", {
      enableSorting: false,
      header: () => <Translate token={"programs:list.content.table.columns.budgetsAvailable"} />,
      cell: info => {
        const value = info.getValue();

        const totalUsdEquivalent = moneyKernelPort.format({
          amount: value.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        const totalPerCurrency = value.totalPerCurrency ?? [];

        if (!totalPerCurrency.length) {
          return "-";
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
                <Translate token={"programs:list.content.table.rows.currencies"} count={totalPerCurrency?.length} />
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
      enableSorting: false,
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
      header: () => <Translate token={"programs:list.content.table.columns.actions"} />,
      cell: info => (
        <Button
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.programs.details.root(info.row.original.id) }}
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
          router.push(NEXT_ROUTER.programs.details.root(row.original.id));
        }}
      />
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </ScrollView>
  );
}
