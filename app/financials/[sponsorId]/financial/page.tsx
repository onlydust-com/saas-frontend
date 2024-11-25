"use client";

import { BudgetAvailableCards } from "@/app/financials/[sponsorId]/financial/_features/budget-available-cards/budget-available-cards";

import { DepositFlow } from "@/shared/panels/_flows/deposit-flow/deposit-flow";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";

export default function FinancialsFinancialPage() {
  return (
    <>
      <BudgetAvailableCards />

      <FinancialDetailSidepanel />
      <DepositFlow />
    </>
  );
}
