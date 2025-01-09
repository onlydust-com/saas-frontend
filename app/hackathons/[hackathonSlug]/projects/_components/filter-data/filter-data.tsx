import { Button } from "@/design-system/atoms/button/variants/button-default";

import { IssueAvailabilityType } from "@/shared/features/autocompletes/issue-available-autocomplete/issue-available-autocomplete.types";
import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { EcosystemFilter } from "@/shared/features/filters/ecosystem-filter/ecosystem-filter";
import { IssueAvailableFilter } from "@/shared/features/filters/issue-available-filter/issue-available-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { HackathonProjectsFilters } from "../../page";
import { useHackathonProjectsFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
  const { name } = useHackathonProjectsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<HackathonProjectsFilters>();

  function getSelectedAvailability(hasAvailableIssues: boolean | undefined): IssueAvailabilityType[] {
    if (hasAvailableIssues === undefined) return [];
    return hasAvailableIssues ? [IssueAvailabilityType.AVAILABLE] : [IssueAvailabilityType.UNAVAILABLE];
  }

  function handleSelect(
    availability: string[],
    setFilters: (filters: { hasAvailableIssues: boolean | undefined }) => void
  ) {
    if (
      availability.includes(IssueAvailabilityType.AVAILABLE) &&
      availability.includes(IssueAvailabilityType.UNAVAILABLE)
    ) {
      setFilters({ hasAvailableIssues: undefined });
    }

    setFilters({ hasAvailableIssues: availability.includes(IssueAvailabilityType.AVAILABLE) });
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"hackathon:details.projects.filters.title"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <LanguageFilter
          selectedLanguages={filters?.languageIds}
          onSelect={languages => setFilters({ languageIds: languages })}
        />
        <EcosystemFilter
          selectedEcosystems={filters?.ecosystemIds}
          onSelect={ecosystems => setFilters({ ecosystemIds: ecosystems })}
        />
        <IssueAvailableFilter
          selectedAvailability={getSelectedAvailability(filters?.hasAvailableIssues)}
          onSelect={availability => handleSelect(availability, setFilters)}
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"common:form.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={() => saveFilters()}>
            <Translate token={"common:form.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
