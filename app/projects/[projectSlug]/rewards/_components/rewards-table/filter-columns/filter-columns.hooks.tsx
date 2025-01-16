import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Layers } from "lucide-react";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { ProjectRewardsInterfaceV2 } from "@/core/domain/project/models/project-rewards-model-v2";

import { Typo } from "@/design-system/atoms/typo";

import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { Metric } from "@/shared/features/projects/metric/metric";
import { CellAvatar } from "@/shared/features/table/cell/cell-avatar/cell-avatar";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  // const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const columnHelper = createColumnHelper<ProjectRewardsInterfaceV2>();

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("project-detail-rewards-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["requestedAt", "from", "to", "contributions", "amount"]);
    }
  }, [selectedIds]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    requestedAt: columnHelper.accessor("requestedAt", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXS,
      minSize: TABLE_CELL_SIZE.XXS,
      header: () => <Translate token={"project:details.rewards.columns.date"} />,
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
    from: columnHelper.accessor("from", {
      enableSorting: false,
      header: () => <Translate token={"project:details.rewards.columns.from"} />,
      cell: info => {
        const from = info.getValue();

        return (
          <CellAvatar
            avatars={from ? [{ src: from.avatarUrl, name: from.login }] : []}
            singleProps={{ withPopover: false }}
          />
        );
      },
    }),
    to: columnHelper.accessor("to", {
      enableSorting: false,
      header: () => <Translate token={"project:details.rewards.columns.to"} />,
      cell: info => {
        const to = info.getValue();

        return (
          <CellAvatar
            avatars={to ? [{ src: to.avatarUrl, name: to.login }] : []}
            singleProps={{ withPopover: false }}
          />
        );
      },
    }),
    contributions: columnHelper.accessor("contributions", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXS,
      minSize: TABLE_CELL_SIZE.XXS,
      header: () => <Translate token={"project:details.rewards.columns.contributions"} />,
      cell: info => {
        const contributions = info.getValue();

        if (!contributions?.length) {
          return <CellEmpty />;
        }

        // TODO wait for backend
        // return <ContributionsPopover contributionsCount={contributions?.length ?? 0} contributionIds={contributions} />;
        return <Metric icon={Layers} count={contributions.length} iconSize="sm" />;
      },
    }),
    amount: columnHelper.accessor("amount", {
      enableSorting: false,
      header: () => <Translate token={"project:details.rewards.columns.amount"} />,
      cell: info => {
        const value = info.getValue();

        return <CellBudget totalUsdEquivalent={value?.usdEquivalent} totalPerCurrency={value ? [value] : []} />;
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<ProjectRewardsInterfaceV2>[];

  return { columns, selectedIds, setSelectedIds };
}
