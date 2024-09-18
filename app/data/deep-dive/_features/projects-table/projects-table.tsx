import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { BiProjectInterface } from "@/core/domain/bi/models/bi-project-model";

import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ProjectsTable() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<BiProjectInterface>();

  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiProjects({
    queryParams: {},
  });

  const projects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  if (isError) {
    return <ErrorState />;
  }

  const columns = [
    columnHelper.accessor("project", {
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

    columnHelper.accessor("projectLeads", {
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

    columnHelper.accessor("categories", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.categories"} />,
      cell: info => {
        const categories = info.getValue();

        if (!categories?.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{categories.map(category => category.name).join(", ")}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("languages", {
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

    columnHelper.accessor("ecosystems", {
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

    columnHelper.accessor("programs", {
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

    columnHelper.accessor("availableBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.globalBudgetAvailable"} />,
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

    columnHelper.accessor("percentUsedBudget", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.percentUsedBudget"} />,
      cell: info => {
        const value = info.getValue();

        if (!value) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{value}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("totalGrantedUsdAmount", {
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

    columnHelper.accessor("averageRewardUsdAmount", {
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

    columnHelper.accessor("onboardedContributorCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.onboardedContributorCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("activeContributorCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.activeContributorCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("mergedPrCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.mergedPrCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("rewardCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.rewardCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("contributionCount", {
      header: () => <Translate token={"data:deepDive.projectsTable.columns.contributionCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
  ];

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
      <Table
        header={{
          headerGroups: table.getHeaderGroups(),
        }}
        rows={table.getRowModel().rows}
        // onRowClick={row => {}}
        classNames={{
          base: "min-w-[1200px]",
        }}
      />
    </ScrollView>
  );
}
