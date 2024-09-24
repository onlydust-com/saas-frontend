"use client";

import { useState } from "react";

import { ContributionsActivityFilter } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter";
import { ContributionsActivityFilterValue } from "@/shared/features/filters/contributions-activity-filter/contributions-activity-filter.types";
import { LanguageFilter } from "@/shared/features/filters/language-filter/language-filter";
import { LeadProjectFilter } from "@/shared/features/filters/lead-project-filter/lead-project-filter";
import { PrMergedCountFilter } from "@/shared/features/filters/pr-merged-count-filter/pr-merged-count-filter";
import { QuantityFilterValues } from "@/shared/features/filters/quantity-filter/quantity-filter.types";
import { TotalRewardedAmountFilter } from "@/shared/features/filters/total-rewarded-amount-filter/total-rewarded-amount-filter";
import { UserTypeFilter } from "@/shared/features/filters/user-type-filter/user-type-filter";

export default function SandboxPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [rewardsAmountTotal, setRewardsAmountTotal] = useState<QuantityFilterValues | undefined>();
  const [prMergedCount, setPrMergedCount] = useState<QuantityFilterValues | undefined>();
  const [selectedUserType, setSelectedUserType] = useState<string[]>([]);

  const [contributionActivity, setContributionActivity] = useState<ContributionsActivityFilterValue | undefined>();

  return (
    <div className={"flex h-full w-full items-start justify-center"}>
      <div className={"h-full w-[384px] bg-background-primary-alt"}>
        <LeadProjectFilter selectedUser={selectedUsers} onSelect={setSelectedUsers} />
        <TotalRewardedAmountFilter value={rewardsAmountTotal} onChange={setRewardsAmountTotal} />
        <LanguageFilter selectedLanguages={selectedLanguages} onSelect={setSelectedLanguages} />
        <UserTypeFilter selectedUserType={selectedUserType} onSelect={setSelectedUserType} />
        <ContributionsActivityFilter value={contributionActivity} onChange={setContributionActivity} />
        <PrMergedCountFilter value={prMergedCount} onChange={setPrMergedCount} />
      </div>
    </div>
  );
}
