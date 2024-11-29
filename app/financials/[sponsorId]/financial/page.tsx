"use client";

import { BudgetAvailableCards } from "@/app/financials/[sponsorId]/financial/_features/budget-available-cards/budget-available-cards";

import { BudgetInTime } from "@/shared/charts/budget-in-time/budget-in-time";
import { DepositFlow } from "@/shared/panels/_flows/deposit-flow/deposit-flow";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";

import { TransactionsContextProvider } from "./_features/transactions/context/transactions.context";
import { Transactions } from "./_features/transactions/transactions";

// TODO: Delete sidepanel after everything is done
// TODO: Regarder pour ajouter un scroll
export default function FinancialsFinancialPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  return (
    <>
      <div className="flex gap-lg">
        <div className="flex flex-1 flex-col gap-lg">
          <BudgetAvailableCards />
          <BudgetInTime sponsorId={sponsorId} />
        </div>

        {/* TODO: Responsive because of chart */}
        <div className="max-w-[500px]">
          <TransactionsContextProvider sponsorId={sponsorId}>
            <Transactions />
          </TransactionsContextProvider>
        </div>
      </div>

      <FinancialDetailSidepanel />
      <DepositFlow />
    </>
  );
}
