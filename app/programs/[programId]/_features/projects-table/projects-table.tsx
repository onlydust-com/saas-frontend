import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { useGrantFromPanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { ProgramProjectListItemInterface } from "@/core/domain/program/models/program-project-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useProjectSidePanel } from "@/shared/panels/project-sidepanel/project-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectsTable({ programId }: { programId: string }) {
  const { open } = useProjectSidePanel();

  const { open: openGrantForm } = useGrantFromPanel();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProgramReactQueryAdapter.client.useGetProgramProjects({
      pathParams: {
        programId,
      },
      options: {
        enabled: Boolean(programId),
      },
    });

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const columnHelper = createColumnHelper<ProgramProjectListItemInterface>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <Translate token={"programs:details.projects.table.columns.projectName"} />,
      cell: info => (
        <AvatarLabelGroup
          avatars={[
            {
              src: info.row.original.logoUrl,
            },
          ]}
          shape={"squared"}
          title={{ children: info.getValue() }}
          description={{ children: info.row.original.truncateDescription(25) }}
        />
      ),
    }),

    columnHelper.accessor("leads", {
      header: () => <Translate token={"programs:details.projects.table.columns.projectLead"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        if (!leads.length) {
          return <Typo size={"xs"}>N/A</Typo>;
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
              description={{ children: <Translate token={"programs:list.content.table.rows.programLead"} /> }}
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
              children: <Translate token={"programs:list.content.table.rows.leads"} count={leads?.length} />,
            }}
          />
        );
      },
    }),

    columnHelper.accessor("totalAvailable", {
      header: () => <Translate token={"programs:details.projects.table.columns.availableBudgets"} />,
      cell: info => {
        const value = info.getValue();

        const totalUsdEquivalent = moneyKernelPort.format({
          amount: value.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        const totalPerCurrency = value.totalPerCurrency ?? [];

        if (!totalPerCurrency.length) {
          return <Typo size={"xs"}>N/A</Typo>;
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
            avatars={
              totalPerCurrency?.map(({ currency }) => ({
                src: currency.logoUrl,
                name: currency.name,
              })) ?? []
            }
            quantity={3}
            title={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            description={{
              children: (
                <Translate token={"programs:list.content.table.rows.currencies"} count={totalPerCurrency?.length} />
              ),
            }}
          />
        );
      },
    }),

    columnHelper.accessor("averageRewardUsdAmount", {
      header: () => <Translate token={"programs:details.projects.table.columns.averageRewardAmount"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue(),
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

    columnHelper.accessor("totalGranted", {
      header: () => <Translate token={"programs:details.projects.table.columns.totalGrantedAmount"} />,
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
      header: () => <Translate token={"programs:details.projects.table.columns.totalRewardedAmount"} />,
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

    columnHelper.accessor("percentUsedBudget", {
      header: () => <Translate token={"programs:details.projects.table.columns.budgetUsed"} />,
      cell: info => {
        const value = info.getValue() ?? 0;

        return <TableCellKpi>{value} %</TableCellKpi>;
      },
    }),

    columnHelper.accessor("mergedPrCount", {
      header: () => <Translate token={"programs:details.projects.table.columns.prsMerged"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        return <TableCellKpi trend={trend}>{value}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("newContributorsCount", {
      header: () => <Translate token={"programs:details.projects.table.columns.onboardedDevs"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        return <TableCellKpi trend={trend}>{value}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("activeContributorsCount", {
      header: () => <Translate token={"programs:details.projects.table.columns.activeDevs"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        return <TableCellKpi trend={trend}>{value}</TableCellKpi>;
      },
    }),

    columnHelper.display({
      id: "actions",
      header: () => <Translate token={"programs:details.projects.table.columns.actions"} />,
      cell: info => {
        const project = info.row.original;

        return (
          <div className={"flex gap-1"}>
            <Button variant={"secondary"} size={"sm"} onClick={() => openGrantForm({ projectId: project.id })}>
              <Translate token={"programs:details.projects.table.rows.grant"} />
            </Button>

            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() =>
                open({ projectId: project.id, onGrantClick: (projectId: string) => openGrantForm({ projectId }) })
              }
            >
              <Translate token={"programs:details.projects.table.rows.seeDetail"} />
            </Button>
          </div>
        );
      },
    }),
  ];

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
    <>
      <ScrollView direction={"x"}>
        <Table
          header={{
            headerGroups: table.getHeaderGroups(),
          }}
          rows={table.getRowModel().rows}
          classNames={{
            base: "min-w-[1620px]",
          }}
          onRowClick={row => open({ projectId: row.original.id })}
          emptyState={{
            message: "programs:details.projects.table.emptyState.message",
          }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </>
  );
}
