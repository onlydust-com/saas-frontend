import {
  FilterColumnsProps,
  TableColumns,
} from "@/app/(saas)/my-dashboard/financial/_features/rewards-table/_components/filter-columns/filter-columns.types";

import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "myDashboard:detail.rewardsTable.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "requestedAt",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.date"} />,
            searchValue: "Date",
            isCheckbox: true,
          },
          {
            id: "id",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.id"} />,
            searchValue: "Id",
            isCheckbox: true,
          },
          {
            id: "project",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.project"} />,
            searchValue: "Project",
            isCheckbox: true,
          },
          {
            id: "from",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.from"} />,
            searchValue: "From",
            isCheckbox: true,
          },
          {
            id: "contributions",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.contributions"} />,
            searchValue: "Contributions",
            isCheckbox: true,
          },
          {
            id: "amount",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.amount"} />,
            searchValue: "Amount",
            isCheckbox: true,
          },
          {
            id: "status",
            label: <Translate token={"myDashboard:detail.rewardsTable.columns.status"} />,
            searchValue: "Status",
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
