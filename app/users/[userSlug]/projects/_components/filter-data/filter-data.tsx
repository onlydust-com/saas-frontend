import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { CategoryFilter } from "@/shared/features/filters/category-filter/category-filter";
import { EcosystemFilter } from "@/shared/features/filters/ecosystem-filter/ecosystem-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { UserProjectsFilters } from "../../page";
import { useUserProjectsFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
  const { name } = useUserProjectsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<UserProjectsFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"users:details.projects.filters.title"} />,
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
        <CategoryFilter
          selectedCategories={filters?.categoryIds}
          onSelect={categories => setFilters({ categoryIds: categories })}
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
