import { ChartColumn, CircleDollarSign } from "lucide-react";
import { useMemo, useState } from "react";

import { TransactionsTrigger } from "@/app/programs/[programId]/_features/transactions-trigger/transactions-trigger";

import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

const BUDGET_AVAILABLE = "budgetAvailable";
const BUDGET_CHART = "budgetChart";

export function FinancialSection() {
  const [toggleFinancialViews, setToggleFinancialViews] = useState<typeof BUDGET_AVAILABLE | typeof BUDGET_CHART>(
    BUDGET_AVAILABLE
  );
  const { close } = useSidePanelsContext();

  const renderFinancialView = useMemo(() => {
    if (toggleFinancialViews === BUDGET_AVAILABLE) {
      return <div>cards</div>;
    }

    return <div>chart</div>;
  }, [toggleFinancialViews]);

  function handleToggleFinancialViews(view: string) {
    close();
    setToggleFinancialViews(view as typeof BUDGET_AVAILABLE | typeof BUDGET_CHART);
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Typo
          size={"xs"}
          weight={"medium"}
          variant={"heading"}
          translate={{ token: "financials:details.financial.title" }}
        />
        <div className="flex max-w-full flex-1 items-center justify-between gap-2">
          <Tabs
            onTabClick={handleToggleFinancialViews}
            variant={"solid"}
            tabs={[
              {
                id: BUDGET_AVAILABLE,
                children: <Translate token={"financials:details.financial.buttons.budgetAvailable"} />,
                startIcon: { component: CircleDollarSign },
              },
              {
                id: BUDGET_CHART,
                children: <Translate token={"financials:details.financial.buttons.budgetChart"} />,
                startIcon: { component: ChartColumn },
              },
            ]}
            selectedId={toggleFinancialViews}
          />
          <TransactionsTrigger />
        </div>
      </div>

      {renderFinancialView}
    </div>
  );
}
