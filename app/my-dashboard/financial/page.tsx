"use client";

import { BudgetAvailableCards } from "@/app/my-dashboard/financial/_features/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/my-dashboard/financial/_features/rewards-table/rewards-table";

import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { RewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel";

export default function MyDashboardFinancialPage() {
  return (
    <>
      <div className="flex h-full flex-col gap-lg overflow-hidden">
        <BudgetAvailableCards />
        <RewardsTable />
      </div>

      <FinancialDetailSidepanel />
      <RewardDetailSidepanel />
    </>
  );
}
