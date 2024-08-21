import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import {
  GrantProject,
  useGrantFormContext,
} from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { ProgramProjectInterface } from "@/core/domain/program/models/program-project-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroupDescription } from "@/design-system/molecules/avatar-group-description";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useProjectSidePanel } from "@/shared/features/panels/project-sidepanel/project-sidepanel.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectsTable({ programId }: { programId: string }) {
  const { open } = useProjectSidePanel();

  const {
    sidePanel: { open: openGrantForm },
    projectState: [, setGrantProject],
  } = useGrantFormContext();
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

  const columnHelper = createColumnHelper<ProgramProjectInterface>();

  function handleOpenProjectGrant(project: GrantProject) {
    setGrantProject(project);
    openGrantForm();
  }

  function handleOpenProjectDetail(projectId: string) {
    open(projectId);
  }

  const columns = [
    columnHelper.accessor("name", {
      header: () => <Translate token={"programs:details.projects.table.columns.projectName"} />,
      cell: info => (
        <AvatarDescription
          avatarProps={{
            src: info.row.original.logoUrl,
            shape: "square",
          }}
          labelProps={{ children: info.getValue() }}
          descriptionProps={{ children: info.row.original.truncateDescription(25) }}
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
            <AvatarDescription
              avatarProps={{
                src: lead.avatarUrl,
              }}
              labelProps={{ children: lead.login }}
              descriptionProps={{ children: <Translate token={"programs:list.content.table.rows.programLead"} /> }}
            />
          );
        }

        return (
          <AvatarGroupDescription
            avatarGroupProps={{
              avatars: leads.map(lead => ({
                src: lead.avatarUrl,
                name: lead.login,
              })),
              maxAvatars: 3,
            }}
            labelProps={{
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
            <AvatarDescription
              avatarProps={{
                src: firstCurrency.currency.logoUrl,
              }}
              labelProps={{ children: `${totalFirstCurrency.amount} ${totalFirstCurrency.code}` }}
              descriptionProps={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            />
          );
        }

        return (
          <AvatarGroupDescription
            avatarGroupProps={{
              avatars:
                totalPerCurrency?.map(({ currency }) => ({
                  src: currency.logoUrl,
                  name: currency.name,
                })) ?? [],
              maxAvatars: 3,
            }}
            labelProps={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            descriptionProps={{
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
            <Button
              variant={"secondary-light"}
              onClick={() =>
                handleOpenProjectGrant({
                  id: project.id,
                  name: project.name,
                  logoUrl: project.logoUrl,
                  description: project.truncateDescription(25),
                  totalAvailable: project.totalAvailable,
                })
              }
            >
              <Translate token={"programs:details.projects.table.rows.grant"} />
            </Button>

            <Button variant={"secondary-light"} onClick={() => handleOpenProjectDetail(project.id)}>
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
    return (
      <div className={"py-24 text-center"}>
        <Typo
          translate={{
            token: "common:state.error.title",
          }}
          color={"text-2"}
        />
      </div>
    );
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
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </>
  );
}
