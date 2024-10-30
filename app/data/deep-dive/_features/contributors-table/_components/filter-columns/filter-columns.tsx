import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps, TableColumns } from "./filter-columns.types";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "data:deepDive.contributorsTable.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "global",
            label: <Translate token={"data:deepDive.contributorsTable.filters.global"} />,
            isLabel: true,
          },
          {
            id: "contributor",
            label: <Translate token={"data:deepDive.contributorsTable.columns.contributorName"} />,
            searchValue: "Contributor name",
            isCheckbox: true,
          },
          {
            id: "projects",
            label: <Translate token={"data:deepDive.contributorsTable.columns.projects"} />,
            searchValue: "Projects",
            isCheckbox: true,
          },
          {
            id: "categories",
            label: <Translate token={"data:deepDive.contributorsTable.columns.categories"} />,
            searchValue: "Categories",
            isCheckbox: true,
          },
          {
            id: "languages",
            label: <Translate token={"data:deepDive.contributorsTable.columns.languages"} />,
            searchValue: "Languages",
            isCheckbox: true,
          },
          {
            id: "ecosystems",
            label: <Translate token={"data:deepDive.contributorsTable.columns.ecosystems"} />,
            searchValue: "Ecosystems",
            isCheckbox: true,
          },
          {
            id: "country",
            label: <Translate token={"data:deepDive.contributorsTable.columns.country"} />,
            searchValue: "Country",
            isCheckbox: true,
          },
          {
            id: "globalSeparator",
            isSeparator: true,
          },
          {
            id: "financial",
            label: <Translate token={"data:deepDive.contributorsTable.filters.financial"} />,
            isLabel: true,
          },
          {
            id: "rewardedAmount",
            label: <Translate token={"data:deepDive.contributorsTable.columns.rewardedAmount"} />,
            searchValue: "Rewarded amount",
            isCheckbox: true,
          },
          {
            id: "financialSeparator",
            isSeparator: true,
          },
          {
            id: "activity",
            label: <Translate token={"data:deepDive.contributorsTable.filters.activity"} />,
            isLabel: true,
          },
          {
            id: "contributionCount",
            label: <Translate token={"data:deepDive.contributorsTable.columns.contributionCount"} />,
            searchValue: "Contributions",
            isCheckbox: true,
          },
          {
            id: "prCount",
            label: <Translate token={"data:deepDive.contributorsTable.columns.prCount"} />,
            searchValue: "PRs",
            isCheckbox: true,
          },
          {
            id: "rewardCount",
            label: <Translate token={"data:deepDive.contributorsTable.columns.rewardCount"} />,
            searchValue: "Rewards",
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
