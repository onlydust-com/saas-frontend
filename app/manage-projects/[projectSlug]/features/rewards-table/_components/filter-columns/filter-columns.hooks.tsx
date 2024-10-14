import { Spinner } from "@nextui-org/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import { TableColumns } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-columns/filter-columns.types";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";
import { RewardListItemInterface } from "@/core/domain/reward/models/reward-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { toast } from "@/design-system/molecules/toaster";

import { PayoutStatus } from "@/shared/features/payout-status/payout-status";
import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns({ projectId }: { projectId: string }) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const idKernelPort = bootstrap.getIdKernelPort();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const columnHelper = createColumnHelper<RewardListItemInterface>();
  const [rewardId, setRewardId] = useState("");

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
  }, [selectedIds, setSelectedIds]);

  const { mutateAsync, isPending } = RewardReactQueryAdapter.client.useCancelProjectReward({
    pathParams: { projectId, rewardId },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"manageProjects:detail.rewardsTable.toast.cancelReward.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"manageProjects:detail.rewardsTable.toast.cancelReward.success"} />);
      },
    },
  });

  async function handleCancelReward(currentRewardId: string) {
    await new Promise<void>(resolve => {
      setRewardId(() => {
        resolve();
        return currentRewardId;
      });
    });

    await mutateAsync({});
  }

  const columnMap: Partial<Record<TableColumns, object>> = {
    requestedAt: columnHelper.accessor("requestedAt", {
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
          />
        );
      },
    }),
    numberOfRewardedContributions: columnHelper.accessor("numberOfRewardedContributions", {
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.contributions"} />,
      cell: info => {
        const numberOfRewardedContributions = info.getValue();

        if (!numberOfRewardedContributions) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{numberOfRewardedContributions}</TableCellKpi>;
      },
    }),
    amount: columnHelper.accessor("amount", {
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.amount"} />,
      cell: info => {
        const value = info.getValue();

        if (!value) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        const totalUsdEquivalent = moneyKernelPort.format({
          amount: value?.usdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: value.currency.logoUrl,
              },
            ]}
            title={{ children: `${value.amount} ${value.currency.code}` }}
            description={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            classNames={{ base: "w-fit" }}
          />
        );
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
      header: () => <Translate token={"manageProjects:detail.rewardsTable.columns.actions"} />,
      cell: info => {
        const id = info.row.original.id;
        const status = info.row.original.status;

        return (
          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={() => handleCancelReward(id)}
            isDisabled={status !== "PENDING_CONTRIBUTOR"}
            translate={{ token: "manageProjects:detail.rewardsTable.rows.cancelReward" }}
          >
            {isPending && rewardId === id ? (
              <Spinner size={"sm"} />
            ) : (
              <Translate token="manageProjects:detail.rewardsTable.rows.cancelReward" />
            )}
          </Button>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<RewardListItemInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
