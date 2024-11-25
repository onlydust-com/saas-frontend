import { BudgetAvailableCards } from "@/app/manage-projects/[projectSlug]/_views/financial/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/manage-projects/[projectSlug]/_views/financial/rewards-table/rewards-table";

export function Financial() {
  return (
    <div className="flex flex-col gap-lg">
      <BudgetAvailableCards />
      <RewardsTable />
    </div>
  );
}
