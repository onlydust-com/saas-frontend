import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { ContributorProjectFilter } from "@/shared/features/filters/contributor-project-filter/contributor-project-filter";
import { CurrencyFilter } from "@/shared/features/filters/currency-filter/currency-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { RewardsTableFilters } from "../../rewards-table";
import { useProjectRewardsFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
  const { name } = useProjectRewardsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<RewardsTableFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"myDashboard:detail.filters.titles.rewards"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <ContributorProjectFilter
          selectedUser={filters.contributors?.map(String)}
          onSelect={(users: string[]) => {
            setFilters({ contributors: users.map(Number) });
          }}
        />
        <CurrencyFilter selectedCurrencies={filters.currencies} onSelect={currencies => setFilters({ currencies })} />
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
