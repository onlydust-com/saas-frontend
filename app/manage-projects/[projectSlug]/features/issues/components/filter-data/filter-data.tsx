import { useContributionsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/features/issues/components/filter-data/filter-data.hooks";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ContributorProjectFilter } from "@/shared/features/filters/contributor-project-filter/contributor-project-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useFilterData } from "./filter-data.context";

export function FilterData() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { name } = useContributionsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"manageProjects:detail.filters.titles.contribution"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <ContributorProjectFilter
          selectedUser={filters.contributorIds?.map(id => id.toString())}
          onSelect={(users: string[]) => setFilters({ contributorIds: users.map(user => Number(user)) })}
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"manageProjects:detail.filters.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={() => saveFilters()}>
            <Translate token={"manageProjects:detail.filters.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
