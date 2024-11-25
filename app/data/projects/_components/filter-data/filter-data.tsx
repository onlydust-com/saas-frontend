import { useProjectFilterDataSidePanel } from "@/app/data/projects/_components/filter-data/filter-data.hooks";
import { ProjectTableFilters } from "@/app/data/projects/page";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { useFilterData } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { AverageRewardCountFilter } from "@/shared/features/filters/average-reward-count-filter/average-reward-count-filter";
import { BudgetAvailableCountFilter } from "@/shared/features/filters/budget-available-count-filter/budget-available-count-filter";
import { BudgetUsedCountFilter } from "@/shared/features/filters/budget-used-count-filter/budget-used-count-filter";
import { CategoryFilter } from "@/shared/features/filters/category-filter/category-filter";
import { ContributionsActivityFilter } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter";
import { DevActiveCountFilter } from "@/shared/features/filters/dev-active-count-filter/dev-active-count-filter";
import { EngagementStatusesFilter } from "@/shared/features/filters/engagement-statuses-filter/engagement-statuses-filter";
import { GrantedCountFilter } from "@/shared/features/filters/granted-count-filter/granted-count-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { LeadProjectFilter } from "@/shared/features/filters/lead-project-filter/lead-project-filter";
import { OnboardedDevCountFilter } from "@/shared/features/filters/onboarded-dev-count-filter/onboarded-dev-count-filter";
import {
  getQuantityFilterAmount,
  getQuantityFilterType,
} from "@/shared/features/filters/quantity-filter/quantity-filter.utils";
import { RewardCountFilter } from "@/shared/features/filters/reward-count-filter/reward-count-filter";
import { TotalRewardedAmountFilter } from "@/shared/features/filters/total-rewarded-amount-filter/total-rewarded-amount-filter";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

export function FilterData() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const { name } = useProjectFilterDataSidePanel();
  const { Panel } = useSidePanel({ name });
  const { filters, setFilters, saveFilters, resetFilters } = useFilterData<ProjectTableFilters>();

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: <Translate token={"data:projectsTable.filters.title"} />,
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>
        <LeadProjectFilter
          selectedUser={filters.projectLeadIds}
          onSelect={(users: string[]) => setFilters({ projectLeadIds: users })}
        />
        <CategoryFilter
          selectedCategories={filters.categoryIds}
          onSelect={categories => setFilters({ categoryIds: categories })}
        />
        <EngagementStatusesFilter
          selectedEngagementStatus={filters.engagementStatuses}
          onSelect={engagementStatuses => setFilters({ engagementStatuses })}
        />
        <LanguageFilter
          selectedLanguages={filters.languageIds}
          onSelect={languages => setFilters({ languageIds: languages })}
        />
        <BudgetAvailableCountFilter
          value={{
            amount: filters.availableBudgetUsdAmount,
            type: getQuantityFilterType(filters.availableBudgetUsdAmount),
          }}
          onChange={value =>
            setFilters({
              availableBudgetUsdAmount: {
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
        <BudgetUsedCountFilter
          value={{
            amount: filters.percentUsedBudget,
            type: getQuantityFilterType(filters.percentUsedBudget),
          }}
          onChange={value =>
            setFilters({
              percentUsedBudget: {
                ...value.amount,
              },
            })
          }
          unit={<Typo size={"sm"} color={"tertiary"} translate={{ token: "features:filters.budgetUsedCount.unit" }} />}
        />
        <GrantedCountFilter
          value={{
            amount: filters.totalGrantedUsdAmount,
            type: getQuantityFilterType(filters.totalGrantedUsdAmount),
          }}
          onChange={value =>
            setFilters({
              totalGrantedUsdAmount: {
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
        <AverageRewardCountFilter
          value={{
            amount: filters.averageRewardUsdAmount,
            type: getQuantityFilterType(filters.averageRewardUsdAmount),
          }}
          onChange={value =>
            setFilters({
              averageRewardUsdAmount: {
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
        <OnboardedDevCountFilter
          value={{
            amount: filters.onboardedContributorCount,
            type: getQuantityFilterType(filters.onboardedContributorCount),
          }}
          onChange={value =>
            setFilters({
              onboardedContributorCount: {
                ...value.amount,
              },
            })
          }
          unit={
            <Typo size={"sm"} color={"tertiary"} translate={{ token: "features:filters.onboardedDevCount.unit" }} />
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
        <ContributionsActivityFilter
          value={{
            amount: getQuantityFilterAmount(filters.contributionCount),
            type: getQuantityFilterType(filters.contributionCount),
            contributionType: filters.contributionCount?.types || [],
          }}
          onChange={value => {
            setFilters({
              contributionCount: {
                ...value.amount,
                types: value.contributionType,
              },
            });
          }}
        />
        <DevActiveCountFilter
          value={{
            amount: filters.activeContributorCount,
            type: getQuantityFilterType(filters.activeContributorCount),
          }}
          onChange={value =>
            setFilters({
              activeContributorCount: {
                ...value.amount,
              },
            })
          }
        />
      </SidePanelBody>
      <SidePanelFooter>
        <div className={"flex w-full flex-row items-center justify-end gap-lg"}>
          <Button size={"md"} variant={"secondary"} onClick={() => resetFilters()}>
            <Translate token={"data:projectsTable.filters.reset"} />
          </Button>

          <Button size={"md"} variant={"secondary"} onClick={() => saveFilters()}>
            <Translate token={"data:projectsTable.filters.save"} />
          </Button>
        </div>
      </SidePanelFooter>
    </Panel>
  );
}
