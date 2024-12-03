import { FinancialColumnChart } from "@/app/my-dashboard/financial/_features/financial-column-chart/financial-column-chart";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useFinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.hooks";
import { PanelContributorType } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.types";

export function BudgetAvailableCards() {
  const { open } = useFinancialDetailSidepanel();

  const { githubUserId } = useAuthUser();

  const { data, isLoading } = BiReactQueryAdapter.client.useGetBiStatsFinancials({
    queryParams: {
      recipientId: githubUserId,
      showEmpty: true,
    },
    options: {
      enabled: Boolean(githubUserId),
    },
  });

  if (isLoading) {
    return (
      <div className="grid min-h-[150px] grid-cols-1 gap-lg tablet:grid-cols-2 desktop:grid-cols-3">
        <CardFinancialLoading />
        <CardFinancialLoading />
        <CardFinancialLoading />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  function openPanel(
    panelType: PanelContributorType,
    total: { totalUsdEquivalent: number; totalPerCurrency?: DetailedTotalMoneyTotalPerCurrency[] }
  ) {
    if (data) {
      open({
        panelType,
        total,
      });
    }
  }

  return (
    <div className="grid h-fit grid-cols-1 gap-lg tablet:grid-cols-2 desktop:grid-cols-3">
      <FinancialCardItem
        title="myDashboard:budgetAvailable.rewarded.title"
        total={data.totalRewarded}
        color="gradient"
        onClick={() => openPanel("rewardedAmount", data.totalRewarded)}
      />

      <FinancialCardItem
        title="myDashboard:budgetAvailable.paid.title"
        total={data.totalPaid}
        color="grey"
        onClick={() => openPanel("rewardPaid", data.totalPaid)}
      />
      <FinancialColumnChart />
    </div>
  );
}
