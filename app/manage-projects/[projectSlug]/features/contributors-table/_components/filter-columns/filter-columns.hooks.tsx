import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Flag from "react-flagpack";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";

import {
  ColumnMap,
  ColumnMapKeys,
} from "@/app/manage-projects/[projectSlug]/features/contributors-table/_components/filter-columns/filter-columns.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";
import { ProjectContributorLabelsResponse } from "@/core/domain/project/models/project-contributor-labels-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { toast } from "@/design-system/molecules/toaster";

import { ContributorLabelPopover } from "@/shared/features/popovers/contributor-label-popover/contributor-label-popover";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

const contributorLabelsMock: ProjectContributorLabelsResponse[] = [
  {
    id: "0151da31-d3e5-447e-816d-ccc32c48dd17",
    slug: "10x",
    name: "10x",
  },
  {
    id: "dd4cd512-f1a4-4f17-b729-d536d81cfa03",
    slug: "1x",
    name: "1x",
  },
];

export function useFilterColumns() {
  const { t } = useTranslation();
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { open: openContributor } = useContributorSidePanel();
  const columnHelper = createColumnHelper<BiContributorInterface & { labels: string[] }>();

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  // TODO @Mehdi handle loading and delete mock once backend ready

  const { mutateAsync: updateContributorLabels, isPending: isUpdationgContributorLabels } =
    ProjectReactQueryAdapter.client.useUpdateProjectContributorLabels({
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
    } catch (error) {
      toast.error(<Translate token={"panels:projectUpdate.messages.error"} />);
    }
  }

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<ColumnMapKeys>>(
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
        "countryCode",
        "totalRewardedUsdAmount",
        "actions",
      ]);
    }
  }, [selectedIds, setSelectedIds]);

  const columnMap: ColumnMap = {
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
          />
        );
      },
    }),
    labels: columnHelper.accessor("labels", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.labels.title"} />,
      cell: info => {
        const githubUserId = info.row.original.contributor.githubUserId;

        return (
          <ContributorLabelPopover
            projectIdOrSlug={projectSlug}
            name={`contributorsLabels-${githubUserId}`}
            placeholder={t("manageProjects:detail.contributorsTable.columns.labels.placeholder")}
            onSelect={selectedIds => onLabelChange(githubUserId, selectedIds)}
            selectedLabels={contributorLabelsMock ?? []}
          />
        );
      },
    }),
    languages: columnHelper.accessor("languages", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.languages"} />,
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
                <Translate token={"manageProjects:detail.contributorsTable.rows.languages"} count={languages?.length} />
              ),
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.ecosystems"} />,
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
                <Translate
                  token={"manageProjects:detail.contributorsTable.rows.ecosystems"}
                  count={ecosystems?.length}
                />
              ),
            }}
          />
        );
      },
    }),
    countryCode: columnHelper.accessor("countryCode", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.country"} />,
      cell: info => {
        const countryCode = info.getValue();

        if (!countryCode) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return (
          <TableCellKpi shape={"squared"} badgeClassNames={{ label: "leading-[0]" }}>
            <Flag code={countryCode} hasBorder={false} size={"m"} />
          </TableCellKpi>
        );
      },
    }),
    totalRewardedUsdAmount: columnHelper.accessor("totalRewardedUsdAmount", {
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.totalRewardedUsdAmount"} />,
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
      header: () => <Translate token={"manageProjects:detail.contributorsTable.columns.actions.title"} />,
      cell: info => (
        <div className="flex gap-2">
          {/*TODO @Mehdi activate one reward form ready */}
          {/*<Button*/}
          {/*  as={BaseLink}*/}
          {/*  htmlProps={{ href: NEXT_ROUTER.manageProjects.details.root(info.row.original.slug) }}*/}
          {/*  variant={"secondary"}*/}
          {/*  size={"sm"}*/}
          {/*  translate={{ token: "manageProjects:detail.contributorsTable.columns.actions.reward" }}*/}
          {/*/>*/}
          <Button
            onClick={() => openContributor({ login: info.row.original.contributor.login })}
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

  return { columns, selectedIds, setSelectedIds };
}
