"use client";

import { useState } from "react";

import { QuantityFilterType } from "@/core/kernel/filters/filters-facade-port";

import { LeadProjectFilter } from "@/shared/features/filters/lead-project-filter/lead-project-filter";
import { QuantityFilterValues } from "@/shared/features/filters/quantity-filter/quantity-filter.types";
import { TotalRewardedAmountFilter } from "@/shared/features/filters/total-rewarded-amount-filter/total-rewarded-amount-filter";
import { UserTypeFilter } from "@/shared/features/filters/user-type-filter/user-type-filter";

export default function SandboxPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [rewardsAmountTotal, setRewardsAmountTotal] = useState<QuantityFilterValues>({
    amount: 0,
    type: QuantityFilterType.EQUAL,
  });
  const [selectedUserType, setSelectedUserType] = useState<string[]>([]);

  console.log(selectedUserType);
  return (
    <div className={"flex h-full w-full items-start justify-center"}>
      <div className={"h-full w-[384px] bg-background-primary-alt"}>
        <LeadProjectFilter selectedUser={selectedUsers} onSelect={setSelectedUsers} />
        <TotalRewardedAmountFilter value={rewardsAmountTotal} onChange={setRewardsAmountTotal} />
        <UserTypeFilter selectedUserType={selectedUserType} onSelect={setSelectedUserType} />
      </div>
    </div>
  );
}
