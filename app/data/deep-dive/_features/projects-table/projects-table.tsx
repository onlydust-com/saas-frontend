import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { BiProjectInterface, BiProjectResponse } from "@/core/domain/bi/models/bi-project-model";

import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { Table, TableLoading } from "@/design-system/molecules/table";
import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectsTable() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<BiProjectInterface>();

  const [selectedIds, setSelectedIds] = useState<Array<keyof BiProjectResponse>>([
    "project",
    "projectLeads",
    "programs",
    "availableBudget",
    "percentUsedBudget",
    "totalGrantedUsdAmount",
    "onboardedContributorCount",
    "activeContributorCount",
    "mergedPrCount",
    "rewardCount",
  ]);

  const { user, isLoading: isLoadingUser, isError: isErrorUser } = useAuthUser();
  const userProgramIds = user?.programs?.map(program => program.id) ?? [];
  const userEcosystemIds = user?.ecosystems?.map(ecosystem => ecosystem.id) ?? [];

  const {
    data,
    isLoading: isLoadingBiProjects,
    isError: isErrorBiProjects,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BiReactQueryAdapter.client.useGetBiProjects({
    queryParams: {
      programOrEcosystemIds: [...userProgramIds, ...userEcosystemIds],
    },
    options: {
      enabled: Boolean(user),
    },
  });

  const isLoading = isLoadingUser || isLoadingBiProjects;
  const isError = isErrorUser || isErrorBiProjects;

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

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
      header: () => <Translate token={"data:deepDive.projectsTable.columns.projectLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        if (!leads.length) {
          return <Typo size={"xs"}>N/A</Typo>;
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
      header: () => <Translate token={"data:deepDive.projectsTable.columns.categories"} />,
      cell: info => {
        const categories = info.getValue();

        if (!categories?.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{categories.map(category => category.name).join(", ")}</TableCellKpi>;
      },
    }),
    languages: columnHelper.accessor("languages", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.languages"} />,
      cell: info => {
        const languages = info.getValue() ?? [];

        if (!languages.length) {
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
              children: <Translate token={"data:deepDive.projectsTable.rows.languages"} count={languages?.length} />,
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.ecosystems"} />,
      cell: info => {
        const ecosystems = info.getValue() ?? [];

        if (!ecosystems.length) {
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
              children: <Translate token={"data:deepDive.projectsTable.rows.ecosystems"} count={ecosystems?.length} />,
            }}
          />
        );
      },
    }),
    programs: columnHelper.accessor("programs", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.programs"} />,
      cell: info => {
        const programs = info.getValue() ?? [];

        if (!programs.length) {
          return <Typo size={"xs"}>N/A</Typo>;
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
          return <Typo size={"xs"}>N/A</Typo>;
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
          />
        );
      },
    }),
    percentUsedBudget: columnHelper.accessor("percentUsedBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.percentUsedBudget"} />,
      cell: info => {
        const value = info.getValue();

        if (!value) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{value}</TableCellKpi>;
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
    mergedPrCount: columnHelper.accessor("mergedPrCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.mergedPrCount"} />,
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
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<BiProjectInterface>[];

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <ScrollView direction={"x"}>
      <div>
        <TableColumnList
          titleProps={{ token: "data:deepDive.projectsTable.filters.columnList" }}
          menuProps={{
            items: [
              {
                id: "global",
                label: <Translate token={"data:deepDive.projectsTable.filters.global"} />,
                isSeparator: true,
              },
              {
                id: "project",
                label: <Translate token={"data:deepDive.projectsTable.columns.projectName"} />,
                isCheckbox: true,
              },
              {
                id: "projectLeads",
                label: <Translate token={"data:deepDive.projectsTable.columns.projectLeads"} />,
                isCheckbox: true,
              },
              {
                id: "categories",
                label: <Translate token={"data:deepDive.projectsTable.columns.categories"} />,
                isCheckbox: true,
              },
              {
                id: "languages",
                label: <Translate token={"data:deepDive.projectsTable.columns.languages"} />,
                isCheckbox: true,
              },
              {
                id: "ecosystems",
                label: <Translate token={"data:deepDive.projectsTable.columns.ecosystems"} />,
                isCheckbox: true,
              },
              {
                id: "programs",
                label: <Translate token={"data:deepDive.projectsTable.columns.programs"} />,
                isCheckbox: true,
              },
              {
                id: "financial",
                label: <Translate token={"data:deepDive.projectsTable.filters.financial"} />,
                isSeparator: true,
              },
              {
                id: "availableBudget",
                label: <Translate token={"data:deepDive.projectsTable.columns.availableBudget"} />,
                isCheckbox: true,
              },
              {
                id: "percentUsedBudget",
                label: <Translate token={"data:deepDive.projectsTable.columns.percentUsedBudget"} />,
                isCheckbox: true,
              },
              {
                id: "totalGrantedUsdAmount",
                label: <Translate token={"data:deepDive.projectsTable.columns.totalGrantedUsdAmount"} />,
                isCheckbox: true,
              },
              {
                id: "averageRewardUsdAmount",
                label: <Translate token={"data:deepDive.projectsTable.columns.averageRewardUsdAmount"} />,
                isCheckbox: true,
              },
              {
                id: "activity",
                label: <Translate token={"data:deepDive.projectsTable.filters.activity"} />,
                isSeparator: true,
              },
              {
                id: "onboardedContributorCount",
                label: <Translate token={"data:deepDive.projectsTable.columns.onboardedContributorCount"} />,
                isCheckbox: true,
              },
              {
                id: "activeContributorCount",
                label: <Translate token={"data:deepDive.projectsTable.columns.activeContributorCount"} />,
                isCheckbox: true,
              },
              {
                id: "mergedPrCount",
                label: <Translate token={"data:deepDive.projectsTable.columns.mergedPrCount"} />,
                isCheckbox: true,
              },
              {
                id: "rewardCount",
                label: <Translate token={"data:deepDive.projectsTable.columns.rewardCount"} />,
                isCheckbox: true,
              },
              {
                id: "contributionCount",
                label: <Translate token={"data:deepDive.projectsTable.columns.contributionCount"} />,
                isCheckbox: true,
              },
            ],
            selectedIds,
            onSelect: ids => setSelectedIds(ids as Array<keyof BiProjectResponse>),
          }}
        />
      </div>
      <Table
        header={{
          headerGroups: table.getHeaderGroups(),
        }}
        rows={table.getRowModel().rows}
        classNames={{
          base: "min-w-[1200px]",
        }}
      />
      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </ScrollView>
  );
}
