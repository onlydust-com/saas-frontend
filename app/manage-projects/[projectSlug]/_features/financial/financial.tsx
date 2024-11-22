import { BudgetAvailableCards } from "@/app/manage-projects/[projectSlug]/_features/financial/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/manage-projects/[projectSlug]/_features/financial/rewards-table/rewards-table";

export function Financial() {
  return (
    <div className="flex h-full flex-col gap-lg">
      <BudgetAvailableCards />
      <RewardsTable />
    </div>
  );
}
