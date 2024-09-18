import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ContributorsTable() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      timeGrouping: "MONTH",
    },
  });

  const contributors = useMemo(() => data?.pages.flatMap(page => page.contributors) ?? [], [data]);

  // TODO @hayden handle error state

  const columnHelper = createColumnHelper<BiContributorInterface>();

  const columns = [
    columnHelper.accessor("contributor", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.contributorName"} />,
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
          />
        );
      },
    }),

    columnHelper.accessor("projects", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.projects"} />,
      cell: info => {
        const projects = info.getValue() ?? [];

        if (!projects.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        if (projects.length === 1) {
          const project = projects[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: project.logoUrl,
                },
              ]}
              title={{ children: project.name }}
              description={{ children: <Translate token={"data:deepDive.projectsTable.rows.projectLead"} /> }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={projects.map(project => ({
              src: project.logoUrl,
              name: project.name,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"data:deepDive.contributorsTable.rows.projects"} count={projects?.length} />,
            }}
          />
        );
      },
    }),

    columnHelper.accessor("categories", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.categories"} />,
      cell: info => {
        const categories = info.getValue();

        if (!categories?.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{categories.map(category => category.name).join(", ")}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("languages", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.languages"} />,
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
              children: (
                <Translate token={"data:deepDive.contributorsTable.rows.languages"} count={languages?.length} />
              ),
            }}
          />
        );
      },
    }),

    columnHelper.accessor("ecosystems", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.ecosystems"} />,
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
              children: (
                <Translate token={"data:deepDive.contributorsTable.rows.ecosystems"} count={ecosystems?.length} />
              ),
            }}
          />
        );
      },
    }),

    columnHelper.accessor("countryCode", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.country"} />,
      cell: info => {
        const countryCode = info.getValue();

        // TODO @hayden
        return <TableCellKpi>{countryCode}</TableCellKpi>;
      },
    }),

    columnHelper.accessor("totalRewardedUsdAmount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.totalRewardedUsdAmount"} />,
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

    columnHelper.accessor("contributionCount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.contributionCount"} />,
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

    columnHelper.accessor("mergedPrCount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.mergedPrCount"} />,
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
  ];

  const table = useReactTable({
    data: contributors,
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
