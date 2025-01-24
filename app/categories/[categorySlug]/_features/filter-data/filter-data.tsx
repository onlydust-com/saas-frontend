import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { EcosystemFilter } from "@/shared/features/filters/ecosystem-filter/ecosystem-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

import { ProjectsFilters } from "../project-list/project-list";
import { useCategoriesProjectsFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
  const { name } = useCategoriesProjectsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<ProjectsFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "Project filters",
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
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button
            size={"md"}
            variant={"secondary"}
            onClick={() => resetFilters()}
            translate={{ token: "common:form.reset" }}
          />

          <Button
            size={"md"}
            variant={"secondary"}
            onClick={() => saveFilters()}
            translate={{ token: "common:form.save" }}
          />
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
