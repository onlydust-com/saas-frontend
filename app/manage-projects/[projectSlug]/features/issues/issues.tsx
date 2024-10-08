import { Columns4, Filter, Table } from "lucide-react";
import { useMemo, useState } from "react";

import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";
import { GetContributionsPortParams } from "@/core/domain/contribution/contribution-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { TableSearch } from "@/design-system/molecules/table-search";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";

import { FilterData } from "./_components/filter-data/filter-data";
import { FilterDataProvider } from "./_components/filter-data/filter-data.context";
import { useContributionsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";
import { KanbanView } from "./_features/kanban-view/kanban-view";
import { ListView } from "./_features/list-view/list-view";
import { IssuesProps } from "./issues.types";

const LIST = "list";
const KANBAN = "kanban";

export type ContributionKanbanFilters = Omit<
  NonNullable<GetContributionsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

export function Issues(_: IssuesProps) {
  const [toggleViews, setToggleViews] = useState<typeof LIST | typeof KANBAN>(KANBAN);
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { open: openFilterPanel } = useContributionsFilterDataSidePanel();
  const { open: openContribution } = useContributionsSidepanel();

  const filtersCount = Object.keys(filters)?.length;

  const queryParams: Partial<GetBiContributorsQueryParams> = {
    search: debouncedSearch,
    ...filters,
  };

  function handleToggleViews(view: string) {
    setToggleViews(view as typeof LIST | typeof KANBAN);
  }

  function onOpenContribution(id: string) {
    openContribution({ id });
  }

  const renderView = useMemo(() => {
    if (toggleViews === LIST) {
      return <ListView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
    }

    return <KanbanView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
  }, [toggleViews]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <Button
            variant={"secondary"}
            size="sm"
            startIcon={{ component: Filter }}
            iconOnly={!filtersCount}
            onClick={() => openFilterPanel()}
            classNames={{
              content: "w-fit",
            }}
            endContent={filtersCount ? <Badge size={"xxs"}>{filtersCount}</Badge> : undefined}
          />

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
