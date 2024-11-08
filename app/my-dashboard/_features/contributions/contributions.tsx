import { Columns4, Table } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { FilterData } from "@/app/my-dashboard/_features/contributions/filter-data/filter-data";
import { useContributorContributionsFilterDataSidePanel } from "@/app/my-dashboard/_features/contributions/filter-data/filter-data.hooks";
import { KanbanView } from "@/app/my-dashboard/_features/contributions/kanban-view/kanban-view";
import { ListView } from "@/app/my-dashboard/_features/contributions/list-view/list-view";

import {
  GetContributionsPortParams,
  GetContributionsQueryParams,
} from "@/core/domain/contribution/contribution-contract.types";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { Icon } from "@/design-system/atoms/icon";
import { TableSearch } from "@/design-system/molecules/table-search";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";

enum View {
  "LIST" = "LIST",
  "KANBAN" = "KANBAN",
}

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function Contributions() {
  const [toggleViews, setToggleViews] = useState<View>(View.KANBAN);
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { open: openFilterPanel } = useContributorContributionsFilterDataSidePanel();
  const { open: openContribution } = useContributionsSidepanel();

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    projectSlugs: projectSlug ? [projectSlug] : undefined,
    types: ["ISSUE", "PULL_REQUEST"],
    showLinkedIssues: false,
    sort: "UPDATED_AT",
    sortDirection: "DESC",
    ...filters,
  };

  function handleToggleViews(view: string) {
    setToggleViews(view as View);
  }

  function onOpenContribution(id: string) {
    openContribution({ id, as: ContributionAs.MAINTAINER });
  }

  const renderView = useMemo(() => {
    if (toggleViews === View.LIST) {
      return <ListView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
    }

    if (toggleViews === View.KANBAN) {
      return <KanbanView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
    }

    return null;
  }, [toggleViews, queryParams]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />

          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />

          <Tabs
            onTabClick={handleToggleViews}
            variant="solid"
            tabs={[
              {
                id: View.LIST,
                children: <Icon component={Table} />,
              },
              {
                id: View.KANBAN,
                children: <Icon component={Columns4} />,
              },
            ]}
            selectedId={toggleViews}
          />
        </nav>

        <div className={"h-full overflow-hidden"}>{renderView}</div>
      </div>

      <FilterData />
    </FilterDataProvider>
  );
}
