"use client";

import { BudgetAvailableCards } from "@/app/manage-projects/[projectSlug]/financial/_features/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/manage-projects/[projectSlug]/financial/_features/rewards-table/rewards-table";

import { ProjectTransactionsSidepanel } from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel";

export default function ManageProgramsFinancialPage({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  return (
    <>
      <div className="flex h-full flex-col gap-lg overflow-hidden">
        <BudgetAvailableCards />
        <RewardsTable />
      </div>

      <ProjectTransactionsSidepanel projectSlug={projectSlug} />
    </>
  );
}
