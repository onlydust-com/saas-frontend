"use client";

import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";
import { ProgramListItemInterface } from "@/core/domain/program/models/program-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";
import { AvatarGroupDescription } from "@/design-system/molecules/avatar-group-description";
import { Table } from "@/design-system/molecules/table";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProgramsPage() {
  const { data } = ProgramReactQueryAdapter.client.useGetPrograms({});
  const programs = useMemo(() => data?.pages.flatMap(page => page.programs) ?? [], [data]);
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const columnHelper = createColumnHelper<ProgramListItemInterface>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Program name</span>,
      cell: info => <Typo>{info.getValue()}</Typo>,
    }),
    columnHelper.accessor("leads", {
      header: () => <span>Program name</span>,
      cell: info => {
        const lead = info.getValue()[0];

        return (
          <AvatarDescription
            avatarProps={{
              src: lead.avatarUrl,
            }}
            labelProps={{ children: lead.login }}
            descriptionProps={{ children: "Program lead" }}
          />
        );
      },
    }),
    columnHelper.accessor("totalAvailable", {
      header: () => <span>Budget available</span>,
      cell: info => {
        return (
          <AvatarGroupDescription
            avatarGroupProps={{
              avatars:
                info.getValue().totalPerCurrency?.map(({ currency }) => ({
                  src: currency.logoUrl,
                  name: currency.name,
                })) ?? [],
            }}
            labelProps={{ children: info.getValue().totalUsdEquivalent }}
            descriptionProps={{ children: info.getValue().totalUsdEquivalent }}
          />
        );
      },
    }),
    columnHelper.accessor("projectCount", {
      header: () => <span>Projects</span>,
      cell: info => {
        return <TableCellKpi>{info.getValue()}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("totalGranted", {
      header: () => <span>Granted</span>,
      cell: info => {
        return <TableCellKpi>{info.getValue().totalUsdEquivalent}</TableCellKpi>;
      },
    }),
    columnHelper.accessor("totalRewarded", {
      header: () => <span>Rewarded</span>,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue().totalUsdEquivalent,
          options: {
            notation: "compact",
          },
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
      header: () => <span>Actions</span>,
      cell: info => (
        <Button
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.programs.details.root(info.row.original.id) }}
          variant={"secondary-light"}
        >
          See program
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: programs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageWrapper
      navigation={{
        iconName: "ri-clipboard-line",
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
          },
        ],
      }}
    >
      <PageContent>
        <div className="grid gap-3">
          <Typo
            variant={"brand"}
            size={"2xl"}
            translate={{
              token: "programs:list.content.title",
            }}
            color={"text-1"}
          />

          <Table
            header={{
              headerGroups: table.getHeaderGroups(),
            }}
            rows={table.getRowModel().rows}
          />
        </div>
      </PageContent>
    </PageWrapper>
  );
}
