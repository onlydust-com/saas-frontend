"use client";

import { BudgetAvailableCards } from "@/app/programs/[programId]/financial/_features/budget-available-cards/budget-available-cards";

import { BudgetInTime } from "@/shared/charts/budget-in-time/budget-in-time";

export default function ProgramsFinancialPage({ params: { programId } }: { params: { programId: string } }) {
  return (
    <div className={"flex flex-col gap-lg"}>
      <BudgetAvailableCards />
      <BudgetInTime programId={programId} />
    </div>
  );
}
