import { useContributorFilterDataSidePanel } from "@/app/data/deep-dive/_features/contributors-table/_components/filter-data/filter-data.hooks";

import { bootstrap } from "@/core/bootstrap";
import { ContributionFilterType } from "@/core/kernel/filters/filters-facade-port";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { CategoryFilter } from "@/shared/features/filters/category-filter/category-filter";
import { ContributionsActivityFilter } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter";
import { getContributionFilterType } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter.utils";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { PrMergedCountFilter } from "@/shared/features/filters/pr-merged-count-filter/pr-merged-count-filter";
import { ProjectFilter } from "@/shared/features/filters/project-filter/project-filter";
import {
  getQuantityFilterAmountFromArray,
  getQuantityFilterType,
  getQuantityFilterTypeFromArray,
} from "@/shared/features/filters/quantity-filter/quantity-filter.utils";
import { RewardCountFilter } from "@/shared/features/filters/reward-count-filter/reward-count-filter";
import { TotalRewardedAmountFilter } from "@/shared/features/filters/total-rewarded-amount-filter/total-rewarded-amount-filter";
import { UserTypeFilter } from "@/shared/features/filters/user-type-filter/user-type-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useFilterData } from "./filter-data.context";

export function FilterData() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { name } = useContributorFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"data:deepDive.filters.titles.contributor"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <UserTypeFilter
          selectedUserType={filters.contributorRoles}
          onSelect={type => setFilters({ contributorRoles: type as typeof filters.contributorRoles })}
        />
        <ProjectFilter selectedProjects={filters.projectIds} onSelect={projectIds => setFilters({ projectIds })} />
        <CategoryFilter
          selectedCategories={filters.categoryIds}
          onSelect={categories => setFilters({ categoryIds: categories })}
        />
        <LanguageFilter
          selectedLanguages={filters.languageIds}
          onSelect={languages => setFilters({ languageIds: languages })}
        />
        <TotalRewardedAmountFilter
          value={{
            amount: filters.totalRewardedUsdAmount,
            type: getQuantityFilterType(filters.totalRewardedUsdAmount),
          }}
          onChange={value =>
            setFilters({
              totalRewardedUsdAmount: {
                ...value.amount,
              },
            })
          }
          unit={
            <Typo size={"sm"} color={"tertiary"}>
              {moneyKernelPort.getCurrency("USD").code}
            </Typo>
          }
        />
        <ContributionsActivityFilter
          value={{
            amount: getQuantityFilterAmountFromArray([filters.prCount, filters.issueCount, filters.codeReviewCount]),
            type: getQuantityFilterTypeFromArray([filters.prCount, filters.issueCount, filters.codeReviewCount]),
            contributionType: getContributionFilterType({
              prCount: filters.prCount,
              issueCount: filters.issueCount,
              codeReviewCount: filters.codeReviewCount,
            }),
          }}
          onChange={value => {
            setFilters({
              ...(value.contributionType.includes(ContributionFilterType.PULL_REQUESTS) && {
                prCount: value.amount,
              }),
              ...(value.contributionType.includes(ContributionFilterType.ISSUES) && {
                issueCount: value.amount,
              }),
              ...(value.contributionType.includes(ContributionFilterType.CODE_REVIEWS) && {
                codeReviewCount: value.amount,
              }),
            });
          }}
        />
        <PrMergedCountFilter
          value={{
            amount: filters.prCount,
            type: getQuantityFilterType(filters.prCount),
          }}
          onChange={value =>
            setFilters({
              prCount: {
                ...value.amount,
              },
            })
          }
        />
        <RewardCountFilter
          value={{
            amount: filters.rewardCount,
            type: getQuantityFilterType(filters.rewardCount),
          }}
          onChange={value =>
            setFilters({
              rewardCount: {
                ...value.amount,
              },
            })
          }
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"data:deepDive.filters.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={() => saveFilters()}>
            <Translate token={"data:deepDive.filters.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
