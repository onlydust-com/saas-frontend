import { FilterColumnsProps } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_components/filter-columns/filter-columns.types";

import { BiContributorResponse } from "@/core/domain/bi/models/bi-contributor-model";

import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "manageProjects:detail.contributorsTable.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "global",
            label: <Translate token={"manageProjects:detail.contributorsTable.filters.global"} />,
            isLabel: true,
          },
          {
            id: "contributor",
            label: <Translate token={"manageProjects:detail.contributorsTable.columns.contributorName"} />,
            searchValue: "Contributor name",
            isCheckbox: true,
          },
          {
            id: "languages",
            label: <Translate token={"manageProjects:detail.contributorsTable.columns.languages"} />,
            searchValue: "Languages",
            isCheckbox: true,
          },
          {
            id: "ecosystems",
            label: <Translate token={"manageProjects:detail.contributorsTable.columns.ecosystems"} />,
            searchValue: "Ecosystems",
            isCheckbox: true,
          },
          {
            id: "countryCode",
            label: <Translate token={"manageProjects:detail.contributorsTable.columns.country"} />,
            searchValue: "Country",
            isCheckbox: true,
          },
          {
            id: "globalSeparator",
            isSeparator: true,
          },
          {
            id: "financial",
            label: <Translate token={"manageProjects:detail.contributorsTable.filters.financial"} />,
            isLabel: true,
          },
          {
            id: "totalRewardedUsdAmount",
            label: <Translate token={"manageProjects:detail.contributorsTable.columns.totalRewardedUsdAmount"} />,
            searchValue: "Rewarded amount",
            isCheckbox: true,
          },
        ],
        selectedIds,
        onSelect: ids => setSelectedIds(ids as Array<keyof BiContributorResponse>),
        isMultiple: true,
      }}
      popoverProps={{
        placement: "bottom-end",
      }}
    />
  );
}
