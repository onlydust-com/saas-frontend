import { ColumnDef, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Flag from "react-flagpack";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { SortDirection } from "@/design-system/molecules/table-sort";
import { toast } from "@/design-system/molecules/toaster";

import { ContributorLabelPopover } from "@/shared/features/popovers/contributor-label-popover/contributor-label-popover";
import { CellEcosystems } from "@/shared/features/table/cell/cell-ecosystems/cell-ecosystems";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { CellLanguages } from "@/shared/features/table/cell/cell-languages/cell-languages";
import { useCanReward } from "@/shared/hooks/rewards/use-can-reward";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  const { t } = useTranslation();
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { open: openContributor } = useContributorSidePanel();
  const { open: openRewardFlow } = useRewardFlow();
  const columnHelper = createColumnHelper<BiContributorInterface & { labels: string[] }>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const canReward = useCanReward(projectSlug);

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const { mutateAsync: updateContributorLabels } = ProjectReactQueryAdapter.client.useUpdateProjectContributorLabels({
    pathParams: { projectId: data?.id ?? "" },
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
      toast.success(<Translate token={"manageProjects:detail.contributorsTable.toast.success"} />);
    } catch (error) {
      toast.error(<Translate token={"manageProjects:detail.contributorsTable.toast.error"} />);
    }
  }

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>(
    "manage-projects-contributors-table-columns"
  );

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds([
        "select",
        "contributor",
        "labels",
        "languages",
        "ecosystems",
        "country",
        "rewardedAmount",
        "actions",
      ]);
    }
  }, [selectedIds, setSelectedIds]);

  const sortingMap: Partial<Record<keyof BiContributorInterface, GetBiContributorsQueryParams["sort"]>> = {
    contributor: "CONTRIBUTOR_LOGIN",
    totalRewardedUsdAmount: "TOTAL_REWARDED_USD_AMOUNT",
  };

  const sortingParams = useMemo(() => {
    if (sorting.length === 0) return null;

    return {
      sort: sortingMap[sorting[0].id as keyof typeof sortingMap],
      sortDirection: sorting[0].desc ? SortDirection.DESC : SortDirection.ASC,
    };
  }, [sorting]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    select: columnHelper.display({
      id: "select",
      enableResizing: false,
      size: 40,
      header: ({ table }) => (
        <Checkbox
          onNativeEventChange={table.getToggleAllRowsSelectedHandler()}
          mixed={table.getIsSomeRowsSelected()}
          value={table.getIsAllRowsSelected()}
        />
      ),
      cell: ({ row }) => (
        <div className="pl-sm">
          <Checkbox
            onNativeEventChange={row.getToggleSelectedHandler()}
            mixed={row.getIsSomeSelected()}
            value={row.getIsSelected()}
            isDisabled={!row.getCanSelect()}
          />
        </div>
      ),
    }),
    contributor: columnHelper.accessor("contributor", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.contributorName"} />,
      cell: info => {
        const contributor = info.getValue();

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: contributor.avatarUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: contributor.login }}
            withPopover={false}
          />
        );
      },
    }),
    labels: columnHelper.accessor("labels", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.labels.title"} />,
      cell: info => {
        const githubUserId = info.row.original.contributor.githubUserId;
        const contributorLabels = info.row.original.projectContributorLabels;
        return (
          <ContributorLabelPopover
            projectIdOrSlug={projectSlug}
            name={`contributorsLabels-${githubUserId}`}
            placeholder={t("manageProjects:detail.contributorsTable.columns.labels.placeholder")}
            onSelect={selectedIds => onLabelChange(githubUserId, selectedIds)}
            selectedLabels={contributorLabels ?? []}
          />
        );
      },
    }),
    languages: columnHelper.accessor("languages", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.languages"} />,
      cell: info => {
        const languages = info.getValue() ?? [];

        return <CellLanguages languages={languages} />;
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.ecosystems"} />,
      cell: info => {
        const ecosystems = info.getValue() ?? [];

        return <CellEcosystems ecosystems={ecosystems} />;
      },
    }),
    country: columnHelper.accessor("country", {
      enableSorting: false,
      size: 65,
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.country"} />,
      cell: info => {
        const country = info.getValue();

        if (!country) {
          return <CellEmpty />;
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
    rewardedAmount: columnHelper.accessor("totalRewardedUsdAmount", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.rewardedAmount"} />,
      cell: info => {
        const { value } = info.getValue() ?? {};

        const { amount, code } = moneyKernelPort.format({
          amount: value,
          currency: moneyKernelPort.getCurrency("USD"),
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
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.actions.title"} />,
      cell: info => (
        <div className="flex gap-sm">
          <Tooltip enabled={!canReward} content={<Translate token="common:tooltip.disabledReward" />}>
            <Button
              onClick={() => openRewardFlow({ githubUserIds: [info.row.original.contributor.githubUserId] })}
              variant={"secondary"}
              size={"sm"}
              translate={{ token: "manageProjects:detail.contributorsTable.columns.actions.reward" }}
              isDisabled={!canReward}
            />
          </Tooltip>

          <Button
            onClick={() => openContributor({ githubId: info.row.original.contributor.githubUserId })}
            variant={"secondary"}
            size={"sm"}
            translate={{ token: "manageProjects:detail.contributorsTable.columns.actions.seeProfile" }}
          />
        </div>
      ),
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<BiContributorInterface>[];

  return { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams };
}
