import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Flag from "react-flagpack";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { ApplicationListItemInterface } from "@/core/domain/application/models/application-list-item-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { toast } from "@/design-system/molecules/toaster";

import { ContributorLabelPopover } from "@/shared/features/popovers/contributor-label-popover/contributor-label-popover";
import { TableColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns() {
  const { t } = useTranslation();
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<ApplicationListItemInterface>();

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
      toast.success(<Translate token={"modals:manageApplicants.table.toast.success"} />);
    } catch (error) {
      toast.error(<Translate token={"modals:manageApplicants.table.toast.error"} />);
    }
  }

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("manage-applicants-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["contributor", "label", "languages", "ecosystems", "country", "rewardedAmount", "actions"]);
    }
  }, [selectedIds, setSelectedIds]);

  function handleAssign(githubUserId: number) {}

  function handleIgnore(githubUserId: number) {}

  const columnMap: Partial<Record<TableColumns, object>> = {
    contributor: columnHelper.display({
      id: "contributor",
      header: () => <Translate token={"modals:manageApplicants.table.columns.contributor"} />,
      cell: info => {
        const { applicant } = info.row.original;
        const applicantTitle = info.row.original.getApplicantTitle();

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: applicant.avatarUrl,
              },
            ]}
            title={{ children: applicant.login }}
            description={{ children: applicantTitle.wording }}
          />
        );
      },
    }),
    label: columnHelper.display({
      id: "label",
      header: () => <Translate token={"modals:manageApplicants.table.columns.label"} />,
      cell: info => {
        const { githubUserId, projectContributorLabels } = info.row.original.applicant;
        const projectId = info.row.original.project.id;

        return (
          <ContributorLabelPopover
            projectIdOrSlug={projectId}
            name={`contributorsLabels-${githubUserId}`}
            placeholder={t("modals:manageApplicants.table.rows.labels.placeholder")}
            onSelect={selectedIds => onLabelChange(githubUserId, selectedIds)}
            selectedLabels={projectContributorLabels ?? []}
          />
        );
      },
    }),
    languages: columnHelper.display({
      id: "languages",
      header: () => <Translate token={"modals:manageApplicants.table.columns.languages"} />,
      cell: info => {
        const { languages } = info.row.original.applicant;

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
              children: <Translate token={"modals:manageApplicants.table.rows.languages"} count={languages?.length} />,
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.display({
      id: "ecosystems",
      header: () => <Translate token={"modals:manageApplicants.table.columns.ecosystems"} />,
      cell: info => {
        const { ecosystems } = info.row.original.applicant;

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
              children: (
                <Translate token={"modals:manageApplicants.table.rows.ecosystems"} count={ecosystems?.length} />
              ),
            }}
          />
        );
      },
    }),
    country: columnHelper.display({
      id: "country",
      header: () => <Translate token={"modals:manageApplicants.table.columns.country"} />,
      cell: info => {
        const { applicant } = info.row.original;

        if (!applicant.countryCode) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return (
          <TableCellKpi shape={"squared"} badgeClassNames={{ label: "leading-[0]" }}>
            <Flag code={applicant.countryCode} hasBorder={false} size={"m"} />
          </TableCellKpi>
        );
      },
    }),
    rewardedAmount: columnHelper.display({
      id: "rewardedAmount",
      header: () => <Translate token={"modals:manageApplicants.table.columns.rewardedAmount"} />,
      cell: info => {
        const { totalRewardedUsdAmount } = info.row.original.applicant;

        const { amount, code } = moneyKernelPort.format({
          amount: totalRewardedUsdAmount,
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
      header: () => <Translate token={"programs:list.content.table.columns.actions"} />,
      cell: info => {
        const { githubUserId } = info.row.original.applicant;
        return (
          <div className={"flex gap-sm"}>
            <Button
              startIcon={{ component: CircleX }}
              variant={"secondary"}
              size={"sm"}
              onClick={() => handleIgnore(githubUserId)}
            >
              <Translate token={"modals:manageApplicants.table.rows.reject"} />
            </Button>

            <Button
              startIcon={{ component: CircleCheck }}
              variant={"secondary"}
              size={"sm"}
              onClick={() => handleAssign(githubUserId)}
            >
              <Translate token={"modals:manageApplicants.table.rows.assign"} />
            </Button>
          </div>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<ApplicationListItemInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
