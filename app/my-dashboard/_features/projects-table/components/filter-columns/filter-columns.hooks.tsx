import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { bootstrap } from "@/core/bootstrap";
import { MeContributorProjectsInterface } from "@/core/domain/me/models/me-contributor-projects-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { ContributionsPopover } from "@/shared/features/contributions/contributions-popover/contributions-popover";
import { ReposPopover } from "@/shared/features/repos/repos-popover/repos-popover";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { CellLanguages } from "@/shared/features/table/cell/cell-languages/cell-languages";
import { CellLeads } from "@/shared/features/table/cell/cell-leads/cell-leads";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<MeContributorProjectsInterface>();

  const columnMap: Partial<Record<TableColumns, object>> = {
    name: columnHelper.accessor("name", {
      enableSorting: false,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.projectName"} />,
      cell: info => {
        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: info.row.original.logoUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: info.row.original.name }}
            withPopover={false}
          />
        );
      },
    }),
    leads: columnHelper.accessor("leads", {
      enableSorting: false,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.projectLeads"} />,
      cell: info => {
        const leads = info.getValue() ?? [];

        return <CellLeads leads={leads} />;
      },
    }),
    contributorCount: columnHelper.accessor("contributorCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.MD,
      minSize: TABLE_CELL_SIZE.MD,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.contributors"} />,
      cell: info => {
        const contributorCount = info.getValue();

        return <TableCellKpi>{contributorCount}</TableCellKpi>;
      },
    }),
    issues: columnHelper.accessor("goodFirstIssueIds", {
      enableSorting: false,
      enableResizing: false,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.issues"} />,
      cell: info => {
        const issues = info.getValue();

        if (!issues?.length) {
          return <CellEmpty />;
        }

        return (
          <ContributionsPopover
            contributionsCount={issues?.length ?? 0}
            contributionIds={issues}
            buttonProps={{
              translate: {
                token: "myDashboard:detail.projectsTable.gfi",
                count: issues?.length ?? 0,
              },
            }}
          />
        );
      },
    }),
    contributionCount: columnHelper.accessor("contributionCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.MD,
      minSize: TABLE_CELL_SIZE.MD,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.contributions"} />,
      cell: info => {
        const contributorCount = info.getValue();

        return <TableCellKpi>{contributorCount}</TableCellKpi>;
      },
    }),
    rewardedUsdAmount: columnHelper.accessor("rewardedUsdAmount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.MD,
      minSize: TABLE_CELL_SIZE.MD,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.rewardedUsdAmount"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue(),
          currency: moneyKernelPort.getCurrency("USD"),
          options: {
            notation: "compact",
          },
          uppercase: true,
        });

        return (
          <TableCellKpi>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    languages: columnHelper.accessor("languages", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.MD,
      minSize: TABLE_CELL_SIZE.MD,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.languages"} />,
      cell: info => {
        const languages = info.getValue() ?? [];

        return <CellLanguages languages={languages} />;
      },
    }),
    repos: columnHelper.accessor("repos", {
      enableSorting: false,
      enableResizing: false,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.repositories"} />,
      cell: info => {
        const repos = info.getValue() ?? [];

        if (repos.length === 0) {
          return <CellEmpty />;
        }

        return <ReposPopover repos={repos} />;
      },
    }),

    actions: columnHelper.display({
      id: "actions",
      enableResizing: false,
      header: () => <Translate token={"myDashboard:detail.projectsTable.columns.actions"} />,
      cell: info => (
        <Button
          as={"a"}
          htmlProps={{
            href: marketplaceRouting(MARKETPLACE_ROUTER.projects.details.root(info.row.original.slug)),
            target: "_blank",
          }}
          variant={"secondary"}
          size={"sm"}
          translate={{ token: "myDashboard:detail.projectsTable.seeProject" }}
        />
      ),
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  const columns = columnMapKeys
    .map(key => columnMap[key])
    .filter(Boolean) as ColumnDef<MeContributorProjectsInterface>[];

  return { columns };
}
