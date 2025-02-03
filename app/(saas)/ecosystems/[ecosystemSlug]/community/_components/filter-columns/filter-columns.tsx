import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps, TableColumns } from "./filter-columns.types";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "ecosystems:details.community.filters.title" }}
      menuProps={{
        items: [
          {
            id: "login",
            label: <Translate token={"ecosystems:details.community.columns.from"} />,
            searchValue: "Name",
            isCheckbox: true,
          },
          {
            id: "projects",
            label: <Translate token={"ecosystems:details.community.columns.projects"} />,
            searchValue: "Projects",
            isCheckbox: true,
          },
          {
            id: "issueAssigned",
            label: <Translate token={"ecosystems:details.community.columns.issueAssigned"} />,
            searchValue: "Issue Assigned",
            isCheckbox: true,
          },
          {
            id: "mergedPullRequestCount",
            label: <Translate token={"ecosystems:details.community.columns.mergedPullRequestCount"} />,
            searchValue: "Merged Pull Requests",
            isCheckbox: true,
          },
          {
            id: "totalEarnedUsdAmount",
            label: <Translate token={"ecosystems:details.community.columns.rewards"} />,
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
