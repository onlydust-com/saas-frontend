import { RewardListItemResponseV2 } from "@/core/domain/reward/models/reward-list-item-v2-model";

import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps } from "./filter-columns.types";

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
            id: "items",
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
        onSelect: ids => setSelectedIds(ids as Array<keyof RewardListItemResponseV2>),
        isMultiple: true,
      }}
      popoverProps={{
        placement: "bottom-end",
      }}
    />
  );
}
