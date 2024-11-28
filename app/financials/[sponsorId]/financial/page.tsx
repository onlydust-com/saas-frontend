"use client";

import { BudgetAvailableCards } from "@/app/financials/[sponsorId]/financial/_features/budget-available-cards/budget-available-cards";
import { BudgetInTime } from "@/app/financials/[sponsorId]/financial/_features/budget-in-time/budget-in-time";

import { DepositFlow } from "@/shared/panels/_flows/deposit-flow/deposit-flow";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";

export default function FinancialsFinancialPage() {
  return (
    <>
      <div className={"flex flex-col gap-lg"}>
        <BudgetAvailableCards />
        <BudgetInTime />
      </div>

      <FinancialDetailSidepanel />
      <DepositFlow />
    </>
  );
}
