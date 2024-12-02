"use client";

import { BudgetAvailableCards } from "@/app/programs/[programId]/financial/_features/budget-available-cards/budget-available-cards";

import { BudgetInTime } from "@/shared/charts/budget-in-time/budget-in-time";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";

import { TransactionsContextProvider } from "./_features/transactions/context/transactions.context";
import { Transactions } from "./_features/transactions/transactions";

export default function ProgramsFinancialPage({ params: { programId } }: { params: { programId: string } }) {
  return (
    <ScrollView>
      <div className="flex h-full gap-lg">
        <div className="flex flex-1 flex-col gap-lg">
          <BudgetAvailableCards />
          <BudgetInTime programId={programId} />
        </div>

        <div>
          <TransactionsContextProvider programId={programId}>
            <Transactions />
          </TransactionsContextProvider>
        </div>
      </div>

      <FinancialDetailSidepanel />
    </ScrollView>
  );
}
