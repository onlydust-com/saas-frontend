import { FilterColumnsProps } from "@/app/manage-projects/[projectSlug]/features/rewards-table/_components/filter-columns/filter-columns.types";

import { RewardListItemResponse } from "@/core/domain/reward/models/reward-list-item-model";

import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "manageProjects:detail.rewardsTable.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "global",
            label: <Translate token={"manageProjects:detail.rewardsTable.filters.global"} />,
            isLabel: true,
          },
          {
            id: "requestedAt",
            label: <Translate token={"manageProjects:detail.rewardsTable.columns.date"} />,
            searchValue: "Date",
            isCheckbox: true,
          },
          {
            id: "id",
            label: <Translate token={"manageProjects:detail.rewardsTable.columns.id"} />,
            searchValue: "Id",
            isCheckbox: true,
          },
          {
            id: "rewardedUser",
            label: <Translate token={"manageProjects:detail.rewardsTable.columns.to"} />,
            searchValue: "To",
            isCheckbox: true,
          },
          {
            id: "globalSeparator",
            isSeparator: true,
          },
          {
            id: "financial",
            label: <Translate token={"manageProjects:detail.rewardsTable.filters.financial"} />,
            isLabel: true,
          },
          {
            id: "numberOfRewardedContributions",
            label: <Translate token={"manageProjects:detail.rewardsTable.columns.contributions"} />,
            searchValue: "Contributions",
            isCheckbox: true,
          },
          {
            id: "amount",
            label: <Translate token={"manageProjects:detail.rewardsTable.columns.amount"} />,
            searchValue: "Amount",
            isCheckbox: true,
          },
          {
            id: "status",
            label: <Translate token={"manageProjects:detail.rewardsTable.columns.status"} />,
            searchValue: "Status",
            isCheckbox: true,
          },
        ],
        selectedIds,
        onSelect: ids => setSelectedIds(ids as Array<keyof RewardListItemResponse>),
        isMultiple: true,
      }}
      popoverProps={{
        placement: "bottom-end",
      }}
    />
  );
}
