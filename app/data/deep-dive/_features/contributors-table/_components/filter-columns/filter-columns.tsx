import { FilterColumnsProps } from "@/app/data/deep-dive/_features/contributors-table/_components/filter-columns/filter-columns.types";

import { BiContributorResponse } from "@/core/domain/bi/models/bi-contributor-model";

import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

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
            id: "countryCode",
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
            id: "totalRewardedUsdAmount",
            label: <Translate token={"data:deepDive.contributorsTable.columns.totalRewardedUsdAmount"} />,
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
            id: "mergedPrCount",
            label: <Translate token={"data:deepDive.contributorsTable.columns.mergedPrCount"} />,
            searchValue: "PRs merged",
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
        onSelect: ids => setSelectedIds(ids as Array<keyof BiContributorResponse>),
        isMultiple: true,
      }}
    />
  );
}
