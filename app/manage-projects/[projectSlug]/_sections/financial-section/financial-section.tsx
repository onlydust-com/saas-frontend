import { ChartColumn, ChevronRight, CircleDollarSign } from "lucide-react";
import { useMemo, useState } from "react";

import { BudgetAvailableCards } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/budget-available-cards/budget-available-cards";
import { FinancialColumnChart } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/financial-column-chart/financial-column-chart";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { useTransactionsSidepanel } from "@/shared/panels/transactions-sidepanel/transactions-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { Transactions } from "./components/transactions/transactions";

const BUDGET_AVAILABLE = "budgetAvailable";
const BUDGET_CHART = "budgetChart";

export function FinancialSection({ projectId }: { projectId?: string }) {
  const [toggleFinancialViews, setToggleFinancialViews] = useState<typeof BUDGET_AVAILABLE | typeof BUDGET_CHART>(
    BUDGET_AVAILABLE
  );
  const { open: openProject } = useProjectUpdateSidePanel();
  const { close } = useSidePanelsContext();

  const { open: onTransactions } = useTransactionsSidepanel();

  const renderFinancialView = useMemo(() => {
    if (toggleFinancialViews === BUDGET_AVAILABLE) {
      return <BudgetAvailableCards />;
    }

    return <FinancialColumnChart />;
  }, [toggleFinancialViews]);

  function handleToggleFinancialViews(view: string) {
    close();
    setToggleFinancialViews(view as typeof BUDGET_AVAILABLE | typeof BUDGET_CHART);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col flex-wrap items-start justify-between gap-2 tablet:flex-row tablet:items-center">
          <div className="flex flex-col items-start justify-start gap-2 tablet:flex-row tablet:items-center">
            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              translate={{ token: "manageProjects:detail.financial.title" }}
            />

            <Tabs
              onTabClick={handleToggleFinancialViews}
              variant={"solid"}
              tabs={[
                {
                  id: BUDGET_AVAILABLE,
                  children: <Translate token={"manageProjects:detail.financial.buttons.budgetAvailable"} />,
                  startIcon: { component: CircleDollarSign },
                },
                {
                  id: BUDGET_CHART,
                  children: <Translate token={"manageProjects:detail.financial.buttons.budgetChart"} />,
                  startIcon: { component: ChartColumn },
                },
              ]}
              selectedId={toggleFinancialViews}
            />
          </div>

          <div className={"flex items-center gap-lg"}>
            {!!projectId && (
              <Button
                variant={"primary"}
                endIcon={{ component: ChevronRight }}
                isTextButton
                size={"md"}
                translate={{ token: "manageProjects:detail.financial.buttons.editProject" }}
                classNames={{
                  base: "max-w-full overflow-hidden",
                  label: "whitespace-nowrap text-ellipsis overflow-hidden",
                }}
                onClick={() => openProject({ projectId })}
              />
            )}

            <Button
              variant={"primary"}
              endIcon={{ component: ChevronRight }}
              isTextButton
              size={"md"}
              translate={{ token: "manageProjects:detail.financial.buttons.seeTransactions" }}
              onClick={onTransactions}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
            />
          </div>
        </div>

        {renderFinancialView}
      </div>

      <Transactions />
    </>
  );
}
