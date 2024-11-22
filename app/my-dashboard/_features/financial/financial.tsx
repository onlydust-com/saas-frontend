import { BudgetAvailableCards } from "@/app/my-dashboard/_features/financial/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/my-dashboard/_features/rewards-table/rewards-table";

export function Financial() {
  return (
    <div className="flex flex-col gap-lg">
      <BudgetAvailableCards />
      <RewardsTable />
    </div>
  );
}
