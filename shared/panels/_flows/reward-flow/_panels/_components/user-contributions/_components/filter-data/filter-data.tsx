import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ContributionTypeFilter } from "@/shared/features/filters/contribution-type-filter/contribution-type-filter";
import { ProjectRepoFilter } from "@/shared/features/filters/project-repo-filter/project-repo-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useFilterData } from "./filter-data.context";
import { useUserContributionsFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
  const { name } = useUserContributionsFilterDataSidePanel();
  const { Panel, back } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"manageProjects:detail.filters.titles.contribution"} />,
        }}
        canGoBack
        canClose
      />
      <SidePanelBody>
        <ContributionTypeFilter
          selectedContributionType={filters.types}
          onSelect={contributionTypes => setFilters({ types: contributionTypes })}
        />

        <ProjectRepoFilter
          selectedRepo={filters.repoIds?.map(id => id.toString())}
          onSelect={repos => setFilters({ repoIds: repos.map(repo => Number(repo)) })}
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"manageProjects:detail.filters.reset"} />
          </Button>

          <Button
            size={"md"}
            variant={"secondary"}
            onClick={() => {
              saveFilters();
              back();
            }}
          >
            <Translate token={"manageProjects:detail.filters.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
