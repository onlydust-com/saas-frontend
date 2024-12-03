"use client";

import { BudgetAvailableCards } from "@/app/manage-projects/[projectSlug]/financial/_features/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/manage-projects/[projectSlug]/financial/_features/rewards-table/rewards-table";

export default function ManageProgramsFinancialPage() {
  return (
    <div className="flex h-full flex-col gap-lg overflow-hidden">
      <BudgetAvailableCards />
      <RewardsTable />
    </div>
  );
}
