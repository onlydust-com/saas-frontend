import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { MeMaintainerProjectsInterface } from "@/core/domain/me/models/me-maintainer-projects-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellLeads } from "@/shared/features/table/cell/cell-leads/cell-leads";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<MeMaintainerProjectsInterface>();

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("manage-projects-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds([
        "name",
        "leads",
        "totalAvailable",
        "contributorCount",
        "totalGranted",
        "totalRewarded",
        "actions",
      ]);
    }
  }, [selectedIds, setSelectedIds]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    name: columnHelper.accessor("name", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.projectName"} />,
      cell: info => {
        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: info.row.original.logoUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: info.row.original.name }}
            withPopover={false}
          />
        );
      },
    }),
    leads: columnHelper.accessor("leads", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.projectLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        return <CellLeads leads={leads} />;
      },
    }),
    totalAvailable: columnHelper.accessor("totalAvailable", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.budget"} />,
      cell: info => {
        const value = info.getValue();
        return <CellBudget totalUsdEquivalent={value?.totalUsdEquivalent} totalPerCurrency={value?.totalPerCurrency} />;
      },
    }),
    contributorCount: columnHelper.accessor("contributorCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.SM,
      minSize: TABLE_CELL_SIZE.SM,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.members"} />,
      cell: info => {
        const contributorCount = info.getValue();

        return <TableCellKpi>{contributorCount}</TableCellKpi>;
      },
    }),
    totalGranted: columnHelper.accessor("totalGranted", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.granted"} />,
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
    totalRewarded: columnHelper.accessor("totalRewarded", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.rewarded"} />,
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
    actions: columnHelper.display({
      id: "actions",
      enableResizing: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.actions"} />,
      cell: info => (
        <Button
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.manageProjects.details.root(info.row.original.slug) }}
          variant={"secondary"}
          size={"sm"}
          translate={{ token: "manageProjects:list.projectsTable.rows.seeProject" }}
        />
      ),
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<MeMaintainerProjectsInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
