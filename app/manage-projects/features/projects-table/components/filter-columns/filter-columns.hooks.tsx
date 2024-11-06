import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import {
  MeProjectListItemInterface,
  MeProjectProjectListItemResponse,
} from "@/core/domain/me/models/me-projects-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<MeProjectListItemInterface>();

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<keyof MeProjectProjectListItemResponse>>(
    "manage-projects-table-columns"
  );

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds([
        "id",
        "slug",
        "name",
        "logoUrl",
        "leads",
        "totalAvailable",
        "contributorCount",
        "totalGranted",
        "totalRewarded",
      ]);
    }
  }, [selectedIds, setSelectedIds]);

  const columnMap: Partial<Record<keyof MeProjectProjectListItemResponse, object>> = {
    name: columnHelper.accessor("name", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.projectName"} />,
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
          />
        );
      },
    }),
    leads: columnHelper.accessor("leads", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.projectLeads"} />,
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
              description={{ children: <Translate token={"manageProjects:list.projectsTable.rows.projectLeads"} /> }}
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
              children: (
                <Translate token={"manageProjects:list.projectsTable.rows.projectLeads"} count={leads?.length} />
              ),
            }}
          />
        );
      },
    }),
    totalAvailable: columnHelper.accessor("totalAvailable", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.budget"} />,
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
            amount: firstCurrency.prettyAmount,
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
                <Translate
                  token={"manageProjects:list.projectsTable.rows.currencies"}
                  count={totalPerCurrency?.length}
                />
              ),
            }}
          />
        );
      },
    }),
    contributorCount: columnHelper.accessor("contributorCount", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.members"} />,
      cell: info => {
        const contributorCount = info.getValue();

        return <TableCellKpi>{contributorCount}</TableCellKpi>;
      },
    }),
    totalGranted: columnHelper.accessor("totalGranted", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.granted"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue().totalUsdEquivalent,
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
    totalRewarded: columnHelper.accessor("totalRewarded", {
      enableSorting: false,
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.rewarded"} />,
      cell: info => {
        const { amount, code } = moneyKernelPort.format({
          amount: info.getValue().totalUsdEquivalent,
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
    slug: columnHelper.display({
      id: "actions",
      header: () => <Translate token={"manageProjects:list.projectsTable.columns.actions"} />,
      cell: info => (
        <Button
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.manageProjects.details.root(info.row.original.slug) }}
          variant={"secondary"}
          size={"sm"}
          translate={{ token: "manageProjects:list.projectsTable.rows.seeProject" }}
        />
      ),
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<MeProjectListItemInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
