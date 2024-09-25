import { useProjectFilterDataSidePanel } from "@/app/data/deep-dive/_features/projects-table/_components/filter-data/filter-data.hooks";

import { LeadProjectFilter } from "@/shared/features/filters/lead-project-filter/lead-project-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { useFilterData } from "./filter-data.context";
import { FilterDataProps } from "./filter-data.types";

export function FilterData({ children }: FilterDataProps) {
  const { name } = useProjectFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters } = useFilterData();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "Filters",
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <LeadProjectFilter
          selectedUser={filters.projectLeadIds}
          onSelect={(users: string[]) => setFilters({ projectLeadIds: users })}
        />
      </SidePanelBody>
    </Panel>
  );
}
