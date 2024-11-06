import { ColumnDef, SortingState, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { BiProjectInterface, BiProjectResponse } from "@/core/domain/bi/models/bi-project-model";

import { Badge } from "@/design-system/atoms/badge";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";
import { SortDirection } from "@/design-system/molecules/table-sort";

import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<BiProjectInterface>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<keyof BiProjectResponse>>(
    "deep-dive-projects-table-columns"
  );

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

  const columnMap: Partial<Record<keyof BiProjectResponse, object>> = {
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

        if (!leads.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
        }

        if (leads.length === 1) {
          const lead = leads[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: lead.avatarUrl,
                },
              ]}
              title={{ children: lead.login }}
              description={{ children: <Translate token={"data:deepDive.projectsTable.rows.projectLead"} /> }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={leads.map(lead => ({
              src: lead.avatarUrl,
              name: lead.login,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"data:deepDive.projectsTable.rows.leads"} count={leads?.length} />,
            }}
          />
        );
      },
    }),
    categories: columnHelper.accessor("categories", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.categories"} />,
      cell: info => {
        const categories = info.getValue();

        if (!categories?.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
        }

        return <TableCellKpi>{categories.map(category => category.name).join(", ")}</TableCellKpi>;
      },
    }),
    languages: columnHelper.accessor("languages", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.languages"} />,
      cell: info => {
        const languages = info.getValue() ?? [];

        if (!languages.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
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
              children: <Translate token={"data:deepDive.projectsTable.rows.languages"} count={languages?.length} />,
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.ecosystems"} />,
      cell: info => {
        const ecosystems = info.getValue() ?? [];

        if (!ecosystems.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
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
              children: <Translate token={"data:deepDive.projectsTable.rows.ecosystems"} count={ecosystems?.length} />,
            }}
          />
        );
      },
    }),
    programs: columnHelper.accessor("programs", {
      enableSorting: false,
      header: () => <Translate token={"data:deepDive.projectsTable.columns.programs"} />,
      cell: info => {
        const programs = info.getValue() ?? [];

        if (!programs.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
        }

        if (programs.length === 1) {
          const program = programs[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: program.logoUrl,
                },
              ]}
              title={{ children: program.name }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={programs.map(program => ({
              src: program.logoUrl,
              name: program.name,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"data:deepDive.projectsTable.rows.programs"} count={programs?.length} />,
            }}
          />
        );
      },
    }),
    availableBudget: columnHelper.accessor("availableBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.availableBudget"} />,
      cell: info => {
        const value = info.getValue();

        const totalUsdEquivalent = moneyKernelPort.format({
          amount: value?.totalUsdEquivalent,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        const totalPerCurrency = value?.totalPerCurrency ?? [];

        if (!totalPerCurrency.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
        }

        if (totalPerCurrency.length === 1) {
          const firstCurrency = totalPerCurrency[0];

          const totalFirstCurrency = moneyKernelPort.format({
            amount: firstCurrency.amount,
            currency: moneyKernelPort.getCurrency(firstCurrency.currency.code),
          });

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: firstCurrency.currency.logoUrl,
                },
              ]}
              title={{ children: `${totalFirstCurrency.amount} ${totalFirstCurrency.code}` }}
              description={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={
              totalPerCurrency?.map(({ currency }) => ({
                src: currency.logoUrl,
                name: currency.name,
              })) ?? []
            }
            quantity={3}
            title={{ children: `~${totalUsdEquivalent.amount} ${totalUsdEquivalent.code}` }}
            description={{
              children: (
                <Translate token={"data:deepDive.projectsTable.rows.currencies"} count={totalPerCurrency?.length} />
              ),
            }}
            popoverContent={(totalPerCurrency ?? [])?.map(amount => {
              return (
                <CardBudget
                  key={amount.currency.id}
                  amount={{
                    value: amount.amount,
                    currency: amount.currency,
                    usdEquivalent: amount.usdEquivalent ?? 0,
                  }}
                  background={"secondary"}
                  border={"primary"}
                  badgeProps={{ color: "brand", children: amount.currency.name }}
                />
              );
            })}
          />
        );
      },
    }),
    percentUsedBudget: columnHelper.accessor("percentUsedBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.percentUsedBudget"} />,
      cell: info => {
        const value = info.getValue();

        if (!value) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
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
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
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
