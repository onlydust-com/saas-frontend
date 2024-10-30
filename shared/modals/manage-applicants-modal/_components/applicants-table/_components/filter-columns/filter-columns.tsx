import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps, TableColumns } from "./filter-columns.types";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "modals:manageApplicants.table.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "global",
            label: <Translate token={"modals:manageApplicants.table.filters.global"} />,
            isLabel: true,
          },
          {
            id: "contributor",
            label: <Translate token={"modals:manageApplicants.table.columns.contributor"} />,
            searchValue: "Contributor",
            isCheckbox: true,
          },
          {
            id: "labels",
            label: <Translate token={"modals:manageApplicants.table.columns.labels"} />,
            searchValue: "Labels",
            isCheckbox: true,
          },
          {
            id: "languages",
            label: <Translate token={"modals:manageApplicants.table.columns.languages"} />,
            searchValue: "Languages",
            isCheckbox: true,
          },
          {
            id: "ecosystems",
            label: <Translate token={"modals:manageApplicants.table.columns.ecosystems"} />,
            searchValue: "Ecosystems",
            isCheckbox: true,
          },
          {
            id: "country",
            label: <Translate token={"modals:manageApplicants.table.columns.country"} />,
            searchValue: "Country",
            isCheckbox: true,
          },
          {
            id: "globalSeparator",
            isSeparator: true,
          },
          {
            id: "financial",
            label: <Translate token={"modals:manageApplicants.table.filters.financial"} />,
            isLabel: true,
          },
          {
            id: "rewardedAmount",
            label: <Translate token={"modals:manageApplicants.table.columns.rewardedAmount"} />,
            searchValue: "Rewarded amount",
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
