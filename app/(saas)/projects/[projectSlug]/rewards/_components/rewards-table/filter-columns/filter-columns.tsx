import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps, TableColumns } from "./filter-columns.types";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "project:details.rewards.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "date",
            label: <Translate token={"project:details.rewards.columns.date"} />,
            searchValue: "Date",
            isCheckbox: true,
          },
          {
            id: "from",
            label: <Translate token={"project:details.rewards.columns.from"} />,
            searchValue: "From",
            isCheckbox: true,
          },
          {
            id: "to",
            label: <Translate token={"project:details.rewards.columns.to"} />,
            searchValue: "To",
            isCheckbox: true,
          },
          {
            id: "contributions",
            label: <Translate token={"project:details.rewards.columns.contributions"} />,
            searchValue: "Contributions",
            isCheckbox: true,
          },
          {
            id: "amount",
            label: <Translate token={"project:details.rewards.columns.amount"} />,
            searchValue: "Amount",
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
