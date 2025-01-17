import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CircleDollarSign, GitMerge } from "lucide-react";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { EcosystemContributorsInterface } from "@/core/domain/ecosystem/models/ecosystem-contributors-list-item-model";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { Metric } from "@/shared/features/projects/metric/metric";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function FilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<EcosystemContributorsInterface>();

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("ecosystem-community-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["login", "projects", "issueAssigned", "mergedPullRequestCount", "totalEarnedUsdAmount"]);
    }
  }, [selectedIds]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    login: columnHelper.accessor("login", {
      enableSorting: false,
      header: () => <Translate token={"ecosystems:details.community.columns.from"} />,
      cell: info => {
        const login = info.getValue();
        const avatarUrl = info.row.original.avatarUrl;
        const rank = info.row.original.rank;

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: avatarUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: login }}
            description={{ children: `${rank.getRankSummary({ hideTitle: true })}` }}
            withPopover={false}
          />
        );
      },
    }),
    mergedPullRequestCount: columnHelper.accessor("mergedPullRequests", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXS,
      maxSize: TABLE_CELL_SIZE.XXS,
      header: () => <Translate token={"ecosystems:details.community.columns.mergedPullRequestCount"} />,
      cell: info => {
        const mergedPullRequests = info.getValue();

        if (!mergedPullRequests?.length) {
          return <CellEmpty />;
        }
        return <Metric icon={GitMerge} count={mergedPullRequests?.length} iconSize="sm" />;
      },
    }),
    totalEarnedUsdAmount: columnHelper.accessor("totalEarnedUsdAmount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XS,
      maxSize: TABLE_CELL_SIZE.XS,
      header: () => <Translate token={"ecosystems:details.community.columns.rewards"} />,
      cell: info => {
        const totalEarnedUsdAmount = info.getValue();

        const { amount, code } = moneyKernelPort.format({
          amount: totalEarnedUsdAmount,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        if (!totalEarnedUsdAmount) {
          return <CellEmpty />;
        }

        return (
          <div className="flex items-center gap-sm">
            <Icon component={CircleDollarSign} size="sm" classNames={{ base: "text-foreground-quinary" }} />

            <Typo size="xs" weight="medium">
              {amount} {code}
            </Typo>
          </div>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<EcosystemContributorsInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
