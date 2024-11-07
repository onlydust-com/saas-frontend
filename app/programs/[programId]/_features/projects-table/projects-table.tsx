import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { useGrantFromPanel } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.hooks";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { ProgramProjectListItemInterface } from "@/core/domain/program/models/program-project-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellLeadsAvatars } from "@/shared/features/table/cell/cell-leads-avatars/cell-leads-avatars";
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

  const { data: program } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const canGrantProjects = Boolean(program?.totalAvailable.totalUsdEquivalent);

  const columnHelper = createColumnHelper<ProgramProjectListItemInterface>();

  const columns = [
    columnHelper.accessor("name", {
      enableSorting: false,
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
      enableSorting: false,
      header: () => <Translate token={"programs:details.projects.table.columns.projectLead"} />,
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
      header: () => <Translate token={"programs:details.projects.table.columns.availableBudgets"} />,
      cell: info => {
        const value = info.getValue();
        return <CellBudget totalUsdEquivalent={value?.totalUsdEquivalent} totalPerCurrency={value?.totalPerCurrency} />;
      },
    }),

    columnHelper.accessor("averageRewardUsdAmount", {
      enableSorting: false,
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
      enableSorting: false,
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
      enableSorting: false,
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
      enableSorting: false,
      header: () => <Translate token={"programs:details.projects.table.columns.budgetUsed"} />,
      cell: info => {
        const value = info.getValue() ?? 0;

        return <TableCellKpi>{value} %</TableCellKpi>;
      },
    }),

    columnHelper.accessor("mergedPrCount", {
      enableSorting: false,
      header: () => <Translate token={"programs:details.projects.table.columns.prsMerged"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        return <TableCellKpi trend={trend}>{value}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("newContributorsCount", {
      enableSorting: false,
      header: () => <Translate token={"programs:details.projects.table.columns.onboardedDevs"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        return <TableCellKpi trend={trend}>{value}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("activeContributorsCount", {
      enableSorting: false,
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
            <Tooltip
              content={<Translate token={"programs:details.projects.table.rows.grant.tooltip"} />}
              enabled={!canGrantProjects}
            >
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => openGrantForm({ programId, projectId: project.id })}
                isDisabled={!canGrantProjects}
              >
                <Translate token={"programs:details.projects.table.rows.grant.button"} />
              </Button>
            </Tooltip>

            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() =>
                open({
                  projectId: project.id,
                  onGrantClick: canGrantProjects
                    ? (projectId: string) => openGrantForm({ programId, projectId })
                    : undefined,
                })
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
          onRowClick={row =>
            open({
              projectId: row.original.id,
              onGrantClick: canGrantProjects
                ? (projectId: string) => openGrantForm({ programId, projectId })
                : undefined,
            })
          }
          emptyState={{
            message: "programs:details.projects.table.emptyState.message",
          }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </>
  );
}
