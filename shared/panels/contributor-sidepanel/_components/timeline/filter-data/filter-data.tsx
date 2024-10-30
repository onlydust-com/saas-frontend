import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { AccordionFilter } from "@/shared/features/filters/accordion-filter/accordion-filter";
import { ContributionTypeFilter } from "@/shared/features/filters/contribution-type-filter/contribution-type-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { DataSourceSelect } from "@/shared/panels/contributor-sidepanel/_components/data-source-select/data-source-select";
import { DateSourceSelect } from "@/shared/panels/contributor-sidepanel/_components/data-source-select/data-source-select.types";
import { useTimelineFilterDataSidePanel } from "@/shared/panels/contributor-sidepanel/_components/timeline/filter-data/filter-data.hooks";
import { TimelineFilters } from "@/shared/panels/contributor-sidepanel/_components/timeline/timeline";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterDataProps } from "./filter-data.types";

export function FilterData({ user }: FilterDataProps) {
  const { name } = useTimelineFilterDataSidePanel();
  const { Panel, back } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<TimelineFilters>();

  function getSelectedDataSourceCount() {
    let count = 0;

    if (filters?.dataSource === "ONLYDUST") {
      count++;
    }

    count += filters?.projectIds?.length || 0;

    return count;
  }

  function onSave() {
    saveFilters();
    back();
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"data:deepDive.filters.titles.project"} />,
        }}
        canGoBack={true}
        canClose={true}
      />
      <SidePanelBody>
        <AccordionFilter
          name={"timeline-data-source"}
          title={{ translate: { token: "panels:contributor.timeline.filter.dataSource" } }}
          selected={getSelectedDataSourceCount()}
        >
          <DataSourceSelect
            user={user}
            name="timeline-data-source"
            selectedProjects={filters.projectIds}
            selectedSource={filters.dataSource as DateSourceSelect | undefined}
            isMultiple={true}
            disabledAutoOrdering={true}
            onSelect={(projectsIds, source) =>
              setFilters({
                projectIds: projectsIds,
                dataSource: source,
              })
            }
          />
        </AccordionFilter>
        <ContributionTypeFilter
          selectedContributionType={filters.types}
          onSelect={contributionTypes => setFilters({ types: contributionTypes })}
          excludeContributionTypes={["CODE_REVIEW"]}
        />
        <LanguageFilter
          selectedLanguages={filters.languageIds}
          onSelect={languages => setFilters({ languageIds: languages })}
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"data:deepDive.filters.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={onSave}>
            <Translate token={"data:deepDive.filters.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
