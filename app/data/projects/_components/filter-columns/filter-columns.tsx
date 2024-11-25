import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps, TableColumns } from "./filter-columns.types";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "data:projectsTable.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "global",
            label: <Translate token={"data:projectsTable.filters.global"} />,
            isLabel: true,
          },
          {
            id: "project",
            label: <Translate token={"data:projectsTable.columns.projectName"} />,
            searchValue: "Project name",
            isCheckbox: true,
          },
          {
            id: "projectLeads",
            label: <Translate token={"data:projectsTable.columns.projectLeads"} />,
            searchValue: "Project leads",
            isCheckbox: true,
          },
          {
            id: "categories",
            label: <Translate token={"data:projectsTable.columns.categories"} />,
            searchValue: "Categories",
            isCheckbox: true,
          },
          {
            id: "languages",
            label: <Translate token={"data:projectsTable.columns.languages"} />,
            searchValue: "Languages",
            isCheckbox: true,
          },
          {
            id: "ecosystems",
            label: <Translate token={"data:projectsTable.columns.ecosystems"} />,
            searchValue: "Ecosystems",
            isCheckbox: true,
          },
          {
            id: "programs",
            label: <Translate token={"data:projectsTable.columns.programs"} />,
            searchValue: "Programs",
            isCheckbox: true,
          },
          {
            id: "globalSeparator",
            isSeparator: true,
          },
          {
            id: "financial",
            label: <Translate token={"data:projectsTable.filters.financial"} />,
            isLabel: true,
          },
          {
            id: "availableBudget",
            label: <Translate token={"data:projectsTable.columns.availableBudget"} />,
            searchValue: "Available budget",
            isCheckbox: true,
          },
          {
            id: "percentUsedBudget",
            label: <Translate token={"data:projectsTable.columns.percentUsedBudget"} />,
            searchValue: "Budget used",
            isCheckbox: true,
          },
          {
            id: "totalGrantedUsdAmount",
            label: <Translate token={"data:projectsTable.columns.totalGrantedUsdAmount"} />,
            searchValue: "Granted amount",
            isCheckbox: true,
          },
          {
            id: "averageRewardUsdAmount",
            label: <Translate token={"data:projectsTable.columns.averageRewardUsdAmount"} />,
            searchValue: "Average reward",
            isCheckbox: true,
          },
          {
            id: "financialSeparator",
            isSeparator: true,
          },
          {
            id: "activity",
            label: <Translate token={"data:projectsTable.filters.activity"} />,
            isLabel: true,
          },
          {
            id: "onboardedContributorCount",
            label: <Translate token={"data:projectsTable.columns.onboardedContributorCount"} />,
            searchValue: "Devs onboarded",
            isCheckbox: true,
          },
          {
            id: "activeContributorCount",
            label: <Translate token={"data:projectsTable.columns.activeContributorCount"} />,
            searchValue: "Active devs",
            isCheckbox: true,
          },
          {
            id: "prCount",
            label: <Translate token={"data:projectsTable.columns.prCount"} />,
            searchValue: "PRs",
            isCheckbox: true,
          },
          {
            id: "rewardCount",
            label: <Translate token={"data:projectsTable.columns.rewardCount"} />,
            searchValue: "Rewards",
            isCheckbox: true,
          },
          {
            id: "contributionCount",
            label: <Translate token={"data:projectsTable.columns.contributionCount"} />,
            searchValue: "Contributions",
            isCheckbox: true,
          },
          {
            id: "engagementStatus",
            label: <Translate token={"data:projectsTable.columns.engagementStatuses"} />,
            searchValue: "Engagement status",
            isCheckbox: true,
          },
        ],
        selectedIds,
        onSelect: ids => setSelectedIds(ids as Array<TableColumns>),
        isMultiple: true,
      }}
      popoverProps={{
        placement: "bottom-end",
      }}
    />
  );
}
