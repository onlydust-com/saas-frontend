import { useProjectRewardsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/financial/_features/rewards-table/_components/filter-data/filter-data.hooks";
import { RewardsTableFilters } from "@/app/manage-projects/[projectSlug]/financial/_features/rewards-table/rewards-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { ContributorProjectFilter } from "@/shared/features/filters/contributor-project-filter/contributor-project-filter";
import { CurrencyFilter } from "@/shared/features/filters/currency-filter/currency-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterData() {
  const { name } = useProjectRewardsFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<RewardsTableFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"manageProjects:detail.filters.titles.rewards"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <ContributorProjectFilter
          selectedUser={filters.contributors?.map(id => id.toString())}
          onSelect={(users: string[]) => {
            setFilters({ contributors: users.map(user => Number(user)) });
          }}
        />
        <CurrencyFilter selectedCurrencies={filters.currencies} onSelect={currencies => setFilters({ currencies })} />
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
