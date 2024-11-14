import { ColumnDef, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { TableColumns } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-columns/filter-columns.types";

import { bootstrap } from "@/core/bootstrap";
import { RewardListItemInterface } from "@/core/domain/reward/models/reward-list-item-model";
import { GetProjectRewardsQueryParams } from "@/core/domain/reward/reward-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { SortDirection } from "@/design-system/molecules/table-sort";

import { CancelReward } from "@/shared/components/mutation/reward/cancel-reward";
import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { ContributionsPopover } from "@/shared/features/contributions/contributions-popover/contributions-popover";
import { PayoutStatus } from "@/shared/features/payout-status/payout-status";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns({ projectId }: { projectId: string }) {
  const idKernelPort = bootstrap.getIdKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const columnHelper = createColumnHelper<RewardListItemInterface>();

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "requestedAt",
      desc: true,
    },
  ]);

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("project-rewards-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds([
        "requestedAt",
        "id",
        "rewardedUser",
        "numberOfRewardedContributions",
        "amount",
        "status",
        "actions",
      ]);
    }
  }, [selectedIds]);

  const sortingMap: Partial<Record<keyof RewardListItemInterface, GetProjectRewardsQueryParams["sort"]>> = {
    requestedAt: "REQUESTED_AT",
    numberOfRewardedContributions: "CONTRIBUTION",
    amount: "AMOUNT",
    status: "STATUS",
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
      size: TABLE_CELL_SIZE.SM,
      minSize: TABLE_CELL_SIZE.SM,
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.date"} />,
      cell: info => {
        const requestedAt = info.getValue();

        return (
          <Typo size={"sm"} color={"quaternary"}>
            {dateKernelPort.format(new Date(requestedAt), "dd/MM/yyyy")}
          </Typo>
        );
      },
    }),
    id: columnHelper.accessor("id", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.SM,
      minSize: TABLE_CELL_SIZE.SM,
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.id"} />,
      cell: info => {
        const id = info.getValue();

        return (
          <Typo size={"sm"} color={"quaternary"}>
            {`#${idKernelPort.prettyId(id)}`}
          </Typo>
        );
      },
    }),
    rewardedUser: columnHelper.accessor("rewardedUser", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.to"} />,
      cell: info => {
        const rewardedUser = info.getValue();

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: rewardedUser.avatarUrl,
              },
            ]}
            shape={"rounded"}
            title={{ children: rewardedUser.login }}
            withPopover={false}
          />
        );
      },
    }),
    numberOfRewardedContributions: columnHelper.accessor("numberOfRewardedContributions", {
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.contributions"} />,
      cell: info => {
        const numberOfRewardedContributions = info.getValue();
        const rewardId = info.row.original.id;

        if (!numberOfRewardedContributions) {
          return <CellEmpty />;
        }

        return <ContributionsPopover contributionsCount={numberOfRewardedContributions} rewardId={rewardId} />;
      },
    }),
    amount: columnHelper.accessor("amount", {
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.amount"} />,
      cell: info => {
        const value = info.getValue();

        return <CellBudget totalUsdEquivalent={value?.usdEquivalent} totalPerCurrency={value ? [value] : []} />;
      },
    }),
    status: columnHelper.accessor("status", {
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.status"} />,
      cell: info => {
        const status = info.getValue();

        return <PayoutStatus status={status} />;
      },
    }),
    actions: columnHelper.display({
      id: "actions",
      enableResizing: false,
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.actions"} />,
      cell: info => {
        const id = info.row.original.id;
        const isDisabled = info.row.original.isCompleted() || info.row.original.isProcessing();

        return (
          <CancelReward projectId={projectId} rewardId={id}>
            {({ cancel, isCanceling }) => (
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={cancel}
                isDisabled={isDisabled}
                isLoading={isCanceling}
                translate={{ token: "manageProjects:detail.rewardsTable.rows.cancelReward" }}
              />
            )}
          </CancelReward>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<RewardListItemInterface>[];

  return { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams };
}
