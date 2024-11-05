import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import Flag from "react-flagpack";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { Checkbox } from "@/design-system/atoms/checkbox";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { toast } from "@/design-system/molecules/toaster";

import { ContributorLabelPopover } from "@/shared/features/popovers/contributor-label-popover/contributor-label-popover";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsHookProps, TableColumns } from "./filter-columns.types";

export function useFilterColumns({ projectId }: FilterColumnsHookProps) {
  const { t } = useTranslation();

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<BiContributorInterface>();

  const { mutateAsync: updateContributorLabels } = ProjectReactQueryAdapter.client.useUpdateProjectContributorLabels({
    pathParams: { projectId },
  });

  async function onLabelChange(githubUserId: number, selectedIds: string[]) {
    try {
      await updateContributorLabels({
        contributorsLabels: [
          {
            githubUserId,
            labels: selectedIds,
          },
        ],
      });
      toast.success(<Translate token={"modals:manageRewards.table.toast.success"} />);
    } catch (error) {
      toast.error(<Translate token={"modals:manageRewards.table.toast.error"} />);
    }
  }

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("manage-rewards-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["select", "contributor", "labels", "languages", "ecosystems", "country", "rewardedAmount"]);
    }
  }, [selectedIds, setSelectedIds]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    select: columnHelper.accessor("contributor", {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          onNativeEventChange={table.getToggleAllRowsSelectedHandler()}
          mixed={table.getIsSomeRowsSelected()}
          value={table.getIsAllRowsSelected()}
          classNames={{ base: "p-lg" }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <Checkbox
            onNativeEventChange={row.getToggleSelectedHandler()}
            mixed={row.getIsSomeSelected()}
            value={row.getIsSelected()}
            isDisabled={!row.getCanSelect()}
          />
        </div>
      ),
    }),
    contributor: columnHelper.display({
      id: "contributor",
      header: () => <Translate token={"modals:manageRewards.table.columns.contributor"} />,
      cell: info => {
        const { contributor, rank } = info.row.original;

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: contributor.avatarUrl,
              },
            ]}
            title={{ children: contributor.login }}
            description={{ children: rank.getTitle().wording }}
          />
        );
      },
    }),
    labels: columnHelper.display({
      id: "labels",
      header: () => <Translate token={"modals:manageRewards.table.columns.labels"} />,
      cell: info => {
        const {
          contributor: { githubUserId },
          projectContributorLabels,
        } = info.row.original;

        return (
          <ContributorLabelPopover
            projectIdOrSlug={projectId}
            name={`contributorsLabels-${githubUserId}`}
            placeholder={t("modals:manageRewards.table.rows.labels.placeholder")}
            onSelect={selectedIds => onLabelChange(githubUserId, selectedIds)}
            selectedLabels={projectContributorLabels ?? []}
          />
        );
      },
    }),
    languages: columnHelper.display({
      id: "languages",
      header: () => <Translate token={"modals:manageRewards.table.columns.languages"} />,
      cell: info => {
        const { languages } = info.row.original;

        if (!languages?.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        if (languages.length === 1) {
          const language = languages[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: language.logoUrl,
                },
              ]}
              title={{ children: language.name }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={languages.map(language => ({
              src: language.logoUrl,
              name: language.name,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"modals:manageRewards.table.rows.languages"} count={languages?.length} />,
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.display({
      id: "ecosystems",
      header: () => <Translate token={"modals:manageRewards.table.columns.ecosystems"} />,
      cell: info => {
        const { ecosystems } = info.row.original;

        if (!ecosystems?.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        if (ecosystems.length === 1) {
          const ecosystem = ecosystems[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: ecosystem.logoUrl,
                },
              ]}
              title={{ children: ecosystem.name }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={ecosystems.map(ecosystem => ({
              src: ecosystem.logoUrl,
              name: ecosystem.name,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"modals:manageRewards.table.rows.ecosystems"} count={ecosystems?.length} />,
            }}
          />
        );
      },
    }),
    country: columnHelper.display({
      id: "country",
      header: () => <Translate token={"modals:manageRewards.table.columns.country"} />,
      cell: info => {
        const { country } = info.row.original;

        if (!country) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return (
          <TableCellKpi shape={"squared"} badgeClassNames={{ label: "leading-[0]" }}>
            <Tooltip content={country.name}>
              <Flag code={country.code} hasBorder={false} size={"m"} />
            </Tooltip>
          </TableCellKpi>
        );
      },
    }),
    rewardedAmount: columnHelper.display({
      id: "rewardedAmount",
      header: () => <Translate token={"modals:manageRewards.table.columns.rewardedAmount"} />,
      cell: info => {
        const { totalRewardedUsdAmount } = info.row.original;

        const { amount, code } = moneyKernelPort.format({
          amount: totalRewardedUsdAmount.value,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <TableCellKpi>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<BiContributorInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
