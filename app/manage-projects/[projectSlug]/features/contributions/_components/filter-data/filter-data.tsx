import { RewardedFilterType } from "@/core/kernel/filters/filters-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ContributorLabelFilter } from "@/shared/features/filters/contributor-label-filter/contributor-label-filter";
import { ContributorProjectFilter } from "@/shared/features/filters/contributor-project-filter/contributor-project-filter";
import { ProjectRepoFilter } from "@/shared/features/filters/project-repo-filter/project-repo-filter";
import { RewardedFilter } from "@/shared/features/filters/rewarded-filter/rewarded-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useFilterData } from "./filter-data.context";
import { useContributionsFilterDataSidePanel } from "./filter-data.hooks";

export function FilterData() {
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
          onSelect={(users: string[]) => {
            setFilters({ contributorIds: users.map(user => Number(user)) });
          }}
        />
        <ContributorLabelFilter
          selectedLabel={filters.projectContributorLabelIds}
          onSelect={(labels: string[]) => setFilters({ projectContributorLabelIds: labels })}
        />
        <ProjectRepoFilter
          selectedRepo={filters.repoIds?.map(id => id.toString())}
          onSelect={(repos: string[]) => setFilters({ repoIds: repos.map(repo => Number(repo)) })}
        />
        <RewardedFilter
          selectedRewardedType={
            filters.hasBeenRewarded ? [RewardedFilterType.REWARDED] : [RewardedFilterType.UNREWARDED]
          }
          onSelect={(rewardedType: string[]) =>
            setFilters({ hasBeenRewarded: rewardedType.includes(RewardedFilterType.REWARDED) })
          }
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
