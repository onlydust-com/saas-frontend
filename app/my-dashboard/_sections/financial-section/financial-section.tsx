import { ChartColumn, ChevronRight, CircleDollarSign } from "lucide-react";
import { useMemo, useState } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { BudgetAvailableCards } from "./_components/budget-available-cards/budget-available-cards";
import { FinancialColumnChart } from "./_components/financial-column-chart/financial-column-chart";
import { TransactionsTrigger } from "./_components/transactions-trigger/transactions-trigger";

const BUDGET_AVAILABLE = "budgetAvailable";
const REWARD_CHART = "rewardChart";

export function FinancialSection() {
  const [toggleFinancialViews, setToggleFinancialViews] = useState<typeof BUDGET_AVAILABLE | typeof REWARD_CHART>(
    BUDGET_AVAILABLE
  );

  const { githubUserId } = useAuthUser();

  const { open: openRequestPaymentFlow } = useRequestPaymentFlow();
  const { close } = useSidePanelsContext();

  const { data: rewardsData } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      recipientIds: githubUserId ? [githubUserId] : undefined,
      statuses: ["PENDING_REQUEST"],
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  const hasRewards = (rewardsData?.pages[0].totalItemNumber || 0) > 0;

  const renderFinancialView = useMemo(() => {
    if (toggleFinancialViews === BUDGET_AVAILABLE) {
      return <BudgetAvailableCards />;
    }

    return <FinancialColumnChart />;
  }, [toggleFinancialViews]);

  function handleToggleFinancialViews(view: string) {
    close();
    setToggleFinancialViews(view as typeof BUDGET_AVAILABLE | typeof REWARD_CHART);
  }

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col flex-wrap justify-between gap-md tablet:flex-row tablet:items-center">
        <div className="flex flex-col gap-md tablet:flex-row tablet:items-center">
          <Typo
            size="xs"
            weight="medium"
            variant="heading"
            translate={{ token: "myDashboard:detail.financial.title" }}
          />

          <Tabs
            onTabClick={handleToggleFinancialViews}
            variant="solid"
            tabs={[
              {
                id: BUDGET_AVAILABLE,
                children: <Translate token="myDashboard:detail.financial.buttons.budgetAvailable" />,
                startIcon: { component: CircleDollarSign },
              },
              {
                id: REWARD_CHART,
                children: <Translate token="myDashboard:detail.financial.buttons.rewardChart" />,
                startIcon: { component: ChartColumn },
              },
            ]}
            selectedId={toggleFinancialViews}
          />
        </div>

        <div className="flex items-center gap-lg">
          <Tooltip
            enabled={!hasRewards}
            content={<Translate token="myDashboard:detail.financial.tooltip.disabledRequestPayment" />}
          >
            <Button
              variant="primary"
              endIcon={{ component: ChevronRight }}
              isTextButton
              size="md"
              translate={{
                token: "myDashboard:detail.financial.buttons.requestPayment",
                count: rewardsData?.pages[0].totalItemNumber,
              }}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              onClick={() => openRequestPaymentFlow({})}
              isDisabled={!hasRewards}
            />
          </Tooltip>

          <TransactionsTrigger />
        </div>
      </div>

      {renderFinancialView}
    </div>
  );
}
