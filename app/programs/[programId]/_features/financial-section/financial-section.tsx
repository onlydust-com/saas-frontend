import { useMemo, useState } from "react";

import { BudgetAvailableCards } from "@/app/programs/[programId]/_features/financial-section/components/budget-available-cards/budget-available-cards";
import { FinancialColumnChart } from "@/app/programs/[programId]/_features/financial-section/components/financial-column-chart/financial-column-chart";
import { TransactionsTrigger } from "@/app/programs/[programId]/_features/transactions-trigger/transactions-trigger";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";

const BUDGET_AVAILABLE = "budgetAvailable";
const BUDGET_CHART = "budgetChart";

export function FinancialSection() {
  const [toggleFinancialViews, setToggleFinancialViews] = useState<typeof BUDGET_AVAILABLE | typeof BUDGET_CHART>(
    BUDGET_AVAILABLE
  );
  const { close } = useSidePanelsContext();

  const renderFinancialView = useMemo(() => {
    if (toggleFinancialViews === BUDGET_AVAILABLE) {
      return <BudgetAvailableCards />;
    }

    return <FinancialColumnChart />;
  }, [toggleFinancialViews]);

  function handleToggleFinancialViews(view: typeof BUDGET_AVAILABLE | typeof BUDGET_CHART) {
    close();
    setToggleFinancialViews(view);
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-start gap-2">
          <Typo size={"2xl"} variant={"brand"} translate={{ token: "programs:details.financial.title" }} />
          <Paper size={"s"} container={"3"} border={"none"} classNames={{ base: "flex gap-2 w-fit p-1" }}>
            <Button
              variant="secondary-light"
              startIcon={{ name: "ri-money-dollar-circle-line" }}
              translate={{ token: "programs:details.financial.buttons.budgetAvailable" }}
              onClick={() => handleToggleFinancialViews(BUDGET_AVAILABLE)}
              isDisabled={toggleFinancialViews === BUDGET_AVAILABLE}
            />
            <Button
              variant="secondary-light"
              startIcon={{ name: "ri-bar-chart-2-line" }}
              translate={{ token: "programs:details.financial.buttons.budgetChart" }}
              onClick={() => handleToggleFinancialViews(BUDGET_CHART)}
              isDisabled={toggleFinancialViews === BUDGET_CHART}
            />
          </Paper>
        </div>
        <TransactionsTrigger />
      </div>

      {renderFinancialView}
    </div>
  );
}
