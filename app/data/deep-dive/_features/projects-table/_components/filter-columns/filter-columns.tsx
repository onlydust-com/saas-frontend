import { FilterColumnsProps } from "@/app/data/deep-dive/_features/projects-table/_components/filter-columns/filter-columns.types";

import { BiProjectResponse } from "@/core/domain/bi/models/bi-project-model";

import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "data:deepDive.projectsTable.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "global",
            label: <Translate token={"data:deepDive.projectsTable.filters.global"} />,
            isLabel: true,
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
            id: "globalSeparator",
            isSeparator: true,
          },
          {
            id: "financial",
            label: <Translate token={"data:deepDive.projectsTable.filters.financial"} />,
            isLabel: true,
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
            id: "financialSeparator",
            isSeparator: true,
          },
          {
            id: "activity",
            label: <Translate token={"data:deepDive.projectsTable.filters.activity"} />,
            isLabel: true,
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
        isMultiple: true,
      }}
    />
  );
}
