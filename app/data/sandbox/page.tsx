"use client";

import { useState } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

import { AverageRewardCountFilter } from "@/shared/features/filters/average-reward-count-filter/average-reward-count-filter";
import { BudgetAvailableCountFilter } from "@/shared/features/filters/budget-available-count-filter/budget-available-count-filter";
import { BudgetUsedCountFilter } from "@/shared/features/filters/budget-used-count-filter/budget-used-count-filter";
import { CategoryFilter } from "@/shared/features/filters/category-filter/category-filter";
import { ContributionsActivityFilter } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter";
import { ContributionsActivityFilterValue } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter.types";
import { DevActiveCountFilter } from "@/shared/features/filters/dev-active-count-filter/dev-active-count-filter";
import { GrantedCountFilter } from "@/shared/features/filters/granted-count-filter/granted-count-filter";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { LeadProjectFilter } from "@/shared/features/filters/lead-project-filter/lead-project-filter";
import { OnboardedDevCountFilter } from "@/shared/features/filters/onboarded-dev-count-filter/onboarded-dev-count-filter";
import { PrMergedCountFilter } from "@/shared/features/filters/pr-merged-count-filter/pr-merged-count-filter";
import { QuantityFilterValues } from "@/shared/features/filters/quantity-filter/quantity-filter.types";
import { RewardCountFilter } from "@/shared/features/filters/reward-count-filter/reward-count-filter";
import { TotalRewardedAmountFilter } from "@/shared/features/filters/total-rewarded-amount-filter/total-rewarded-amount-filter";
import { UserTypeFilter } from "@/shared/features/filters/user-type-filter/user-type-filter";

export default function SandboxPage() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [rewardsAmountTotal, setRewardsAmountTotal] = useState<QuantityFilterValues | undefined>();
  const [prMergedCount, setPrMergedCount] = useState<QuantityFilterValues | undefined>();
  const [rewardCount, setRewardCount] = useState<QuantityFilterValues | undefined>();
  const [devActiveCount, setDevActiveCount] = useState<QuantityFilterValues | undefined>();
  const [budgetAvailableCount, setBudgetAvailableCount] = useState<QuantityFilterValues | undefined>();
  const [grantedCount, setGrantedCount] = useState<QuantityFilterValues | undefined>();
  const [onboardedDevCount, setOnboardedDevCount] = useState<QuantityFilterValues | undefined>();
  const [averageRewardCount, setAverageRewardCount] = useState<QuantityFilterValues | undefined>();
  const [budgetUsedCount, setBudgetUsedCount] = useState<QuantityFilterValues | undefined>();
  const [selectedUserType, setSelectedUserType] = useState<string[]>([]);

  const [contributionActivity, setContributionActivity] = useState<ContributionsActivityFilterValue | undefined>();

  return (
    <div className={"flex h-full w-full items-start justify-center"}>
      <div className={"h-full w-[384px] bg-background-primary-alt"}>
        <LeadProjectFilter selectedUser={selectedUsers} onSelect={setSelectedUsers} />
        <TotalRewardedAmountFilter value={rewardsAmountTotal} onChange={setRewardsAmountTotal} />
        <LanguageFilter selectedLanguages={selectedLanguages} onSelect={setSelectedLanguages} />
        <CategoryFilter selectedCategories={selectedCategories} onSelect={setSelectedCategories} />
        <UserTypeFilter selectedUserType={selectedUserType} onSelect={setSelectedUserType} />
        <ContributionsActivityFilter value={contributionActivity} onChange={setContributionActivity} />
        <PrMergedCountFilter value={prMergedCount} onChange={setPrMergedCount} />
        <RewardCountFilter value={rewardCount} onChange={setRewardCount} />
        <BudgetAvailableCountFilter
          value={budgetAvailableCount}
          onChange={setBudgetAvailableCount}
          unit={
            <Typo size={"sm"} color={"tertiary"}>
              {moneyKernelPort.getCurrency("USD").code}
            </Typo>
          }
        />
        <GrantedCountFilter
          value={grantedCount}
          onChange={setGrantedCount}
          unit={
            <Typo size={"sm"} color={"tertiary"}>
              {moneyKernelPort.getCurrency("USD").code}
            </Typo>
          }
        />
        <AverageRewardCountFilter
          value={averageRewardCount}
          onChange={setAverageRewardCount}
          unit={
            <Typo size={"sm"} color={"tertiary"}>
              {moneyKernelPort.getCurrency("USD").code}
            </Typo>
          }
        />
        <BudgetUsedCountFilter
          value={budgetUsedCount}
          onChange={setBudgetUsedCount}
          unit={<Typo size={"sm"} color={"tertiary"} translate={{ token: "features:filters.budgetUsedCount.unit" }} />}
        />
        <OnboardedDevCountFilter
          value={onboardedDevCount}
          onChange={setOnboardedDevCount}
          unit={
            <Typo size={"sm"} color={"tertiary"} translate={{ token: "features:filters.onboardedDevCount.unit" }} />
          }
        />
        <DevActiveCountFilter value={devActiveCount} onChange={setDevActiveCount} />
      </div>
    </div>
  );
}
