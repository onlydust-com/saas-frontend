import { ColumnDef, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { RewardListItemV2Interface } from "@/core/domain/reward/models/reward-list-item-v2-model";
import { GetProjectRewardsQueryParams } from "@/core/domain/reward/reward-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import { SortDirection } from "@/design-system/molecules/table-sort";

import { ContributionsPopover } from "@/shared/features/contributions/contributions-popover/contributions-popover";
import { PayoutStatus } from "@/shared/features/payout-status/payout-status";
import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { CellProjects } from "@/shared/features/table/cell/cell-projects/cell-projects";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  const idKernelPort = bootstrap.getIdKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const columnHelper = createColumnHelper<RewardListItemV2Interface>();

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "requestedAt",
      desc: true,
    },
  ]);

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("project-rewards-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["requestedAt", "id", "project", "from", "amount", "status", "contributions"]);
    }
  }, [selectedIds]);

  const sortingMap: Partial<Record<keyof RewardListItemV2Interface, GetProjectRewardsQueryParams["sort"]>> = {
    requestedAt: "REQUESTED_AT",
  };

  const sortingParams = useMemo(() => {
    if (sorting.length === 0) return null;

    return {
      sort: sortingMap[sorting[0].id as keyof typeof sortingMap],
      direction: sorting[0].desc ? SortDirection.DESC : SortDirection.ASC,
    };
  }, [sorting]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    requestedAt: columnHelper.accessor("requestedAt", {
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.date"} />,
      cell: info => {
        const requestedAt = info.getValue();

        if (!requestedAt) {
          return <CellEmpty />;
        }
        return (
          <Typo size={"sm"} color={"quaternary"}>
            {dateKernelPort.format(new Date(requestedAt), "dd/MM/yyyy")}
          </Typo>
        );
      },
    }),
    id: columnHelper.accessor("id", {
      enableSorting: false,
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.id"} />,
      cell: info => {
        const id = info.getValue();

        return (
          <Typo size={"sm"} color={"quaternary"}>
            {`#${idKernelPort.prettyId(id)}`}
          </Typo>
        );
      },
    }),
    project: columnHelper.accessor("project", {
      enableSorting: false,
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.project"} />,
      cell: info => {
        const project = info.getValue();

        return <CellProjects projects={project ? [project] : []} singleProps={{ shape: "squared" }} />;
      },
    }),
    from: columnHelper.accessor("from", {
      enableSorting: false,
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.from"} />,
      cell: info => {
        const from = info.getValue();

        return <CellAvatar avatars={from ? [{ src: from.avatarUrl, name: from.login }] : []} />;
      },
    }),
    contributions: columnHelper.accessor("items", {
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.contributions"} />,
      cell: info => {
        const contributions = info.getValue();

        if (!contributions?.length) {
          return <CellEmpty />;
        }

        return <ContributionsPopover contributionsCount={contributions?.length ?? 0} contributionIds={contributions} />;
      },
    }),
    amount: columnHelper.accessor("amount", {
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.amount"} />,
      cell: info => {
        const value = info.getValue();

        return <CellBudget totalUsdEquivalent={value?.usdEquivalent} totalPerCurrency={value ? [value] : []} />;
      },
    }),
    status: columnHelper.accessor("status", {
      header: () => <Translate token={"myDashboard:detail.rewardsTable.columns.status"} />,
      cell: info => {
        const status = info.getValue();

        if (!status) {
          return <CellEmpty />;
        }

        return <PayoutStatus status={status} />;
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<RewardListItemV2Interface>[];

  return { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams };
}
