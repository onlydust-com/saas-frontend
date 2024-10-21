import { Columns4, Table } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  GetContributionsPortParams,
  GetContributionsQueryParams,
} from "@/core/domain/contribution/contribution-contract.types";

import { Icon } from "@/design-system/atoms/icon";
import { TableSearch } from "@/design-system/molecules/table-search";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";

import { FilterData } from "./_components/filter-data/filter-data";
import { useContributionsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";
import { KanbanView } from "./_features/kanban-view/kanban-view";
import { ListView } from "./_features/list-view/list-view";
import { ContributionsProps } from "./contributions.types";

const LIST = "list";
const KANBAN = "kanban";

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function Contributions(_: ContributionsProps) {
  const [toggleViews, setToggleViews] = useState<typeof LIST | typeof KANBAN>(KANBAN);
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { open: openFilterPanel } = useContributionsFilterDataSidePanel();
  const { open: openContribution } = useContributionsSidepanel();

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    projectSlugs: projectSlug ? [projectSlug] : undefined,
    types: ["ISSUE", "PULL_REQUEST"],
    ...filters,
  };

  function handleToggleViews(view: string) {
    setToggleViews(view as typeof LIST | typeof KANBAN);
  }

  function onOpenContribution(githubId: number) {
    openContribution({ githubId });
  }

  const renderView = useMemo(() => {
    if (toggleViews === LIST) {
      return <ListView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
    }

    return <KanbanView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
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
                id: LIST,
                children: <Icon component={Table} />,
              },
              {
                id: KANBAN,
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
