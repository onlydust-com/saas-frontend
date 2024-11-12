import { ColumnDef, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { BiProjectInterface } from "@/core/domain/bi/models/bi-project-model";

import { Badge } from "@/design-system/atoms/badge";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { SortDirection } from "@/design-system/molecules/table-sort";

import { CellBadge } from "@/shared/features/table/cell/cell-badge/cell-badge";
import { CellBudget } from "@/shared/features/table/cell/cell-budget/cell-budget";
import { CellEcosystems } from "@/shared/features/table/cell/cell-ecosystems/cell-ecosystems";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { CellLanguages } from "@/shared/features/table/cell/cell-languages/cell-languages";
import { CellLeads } from "@/shared/features/table/cell/cell-leads/cell-leads";
import { CellPrograms } from "@/shared/features/table/cell/cell-programs/cell-programs";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<BiProjectInterface>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("deep-dive-projects-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds([
        "project",
        "projectLeads",
        "categories",
        "languages",
        "ecosystems",
        "programs",
        "availableBudget",
        "percentUsedBudget",
        "totalGrantedUsdAmount",
        "averageRewardUsdAmount",
        "onboardedContributorCount",
        "activeContributorCount",
        "prCount",
        "rewardCount",
        "contributionCount",
        "engagementStatus",
      ]);
    }
  }, [selectedIds, setSelectedIds]);

  const sortingMap: Partial<Record<keyof BiProjectInterface, GetBiProjectsQueryParams["sort"]>> = {
    project: "PROJECT_NAME",
    availableBudget: "AVAILABLE_BUDGET_USD_AMOUNT",
    percentUsedBudget: "PERCENT_USED_BUDGET",
    totalGrantedUsdAmount: "TOTAL_GRANTED_USD_AMOUNT",
    averageRewardUsdAmount: "AVERAGE_REWARD_USD_AMOUNT",
    onboardedContributorCount: "ONBOARDED_CONTRIBUTOR_COUNT",
    activeContributorCount: "ACTIVE_CONTRIBUTOR_COUNT",
    prCount: "PR_COUNT",
    rewardCount: "REWARD_COUNT",
    contributionCount: "CONTRIBUTION_COUNT",
  };

  const sortingParams = useMemo(() => {
    if (sorting.length === 0) return null;

    return {
      sort: sortingMap[sorting[0].id as keyof typeof sortingMap],
      sortDirection: sorting[0].desc ? SortDirection.DESC : SortDirection.ASC,
    };
  }, [sorting]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    project: columnHelper.accessor("project", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.projectName"} />,
      cell: info => {
        const project = info.getValue();

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: project.logoUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: project.name }}
          />
        );
      },
    }),
    projectLeads: columnHelper.accessor("projectLeads", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.projectLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        return <CellLeads leads={leads} />;
      },
    }),
    categories: columnHelper.accessor("categories", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.categories"} />,
      cell: info => {
        const categories = info.getValue();
        return <CellBadge items={categories?.map(category => category.name)} />;
      },
    }),
    languages: columnHelper.accessor("languages", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.languages"} />,
      cell: info => {
        const languages = info.getValue() ?? [];

        return <CellLanguages languages={languages} />;
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.ecosystems"} />,
      cell: info => {
        const ecosystems = info.getValue() ?? [];

        return <CellEcosystems ecosystems={ecosystems} />;
      },
    }),
    programs: columnHelper.accessor("programs", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.programs"} />,
      cell: info => {
        const programs = info.getValue() ?? [];

        return <CellPrograms programs={programs} />;
      },
    }),
    availableBudget: columnHelper.accessor("availableBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.availableBudget"} />,
      cell: info => {
        const value = info.getValue();

        return <CellBudget totalUsdEquivalent={value?.totalUsdEquivalent} totalPerCurrency={value?.totalPerCurrency} />;
      },
    }),
    percentUsedBudget: columnHelper.accessor("percentUsedBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.percentUsedBudget"} />,
      cell: info => {
        const value = info.getValue();

        if (!value) {
          return <CellEmpty />;
        }

        return <TableCellKpi>{value}%</TableCellKpi>;
      },
    }),
    totalGrantedUsdAmount: columnHelper.accessor("totalGrantedUsdAmount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.totalGrantedUsdAmount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const { amount, code } = moneyKernelPort.format({
          amount: value,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <TableCellKpi trend={trend}>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    averageRewardUsdAmount: columnHelper.accessor("averageRewardUsdAmount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.averageRewardUsdAmount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const { amount, code } = moneyKernelPort.format({
          amount: value,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <TableCellKpi trend={trend}>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    onboardedContributorCount: columnHelper.accessor("onboardedContributorCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.onboardedContributorCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    activeContributorCount: columnHelper.accessor("activeContributorCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.activeContributorCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    prCount: columnHelper.accessor("prCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.prCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    rewardCount: columnHelper.accessor("rewardCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.rewardCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    contributionCount: columnHelper.accessor("contributionCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.contributionCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    engagementStatus: columnHelper.accessor("engagementStatus", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.engagementStatuses"} />,
      cell: info => {
        const engagementStatuses = info.getValue();

        if (!engagementStatuses) {
          return <CellEmpty />;
        }

        return (
          <Badge
            size="sm"
            shape="squared"
            classNames={{ base: "w-fit" }}
            translate={{ token: `common:contributorEngagementStatus.${engagementStatuses}` }}
          />
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<BiProjectInterface>[];

  return { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams };
}
