import { useMemo } from "react";

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

  const rewardPendingAmount = useMemo(() => {
    if (!data) {
      return {
        totalUsdEquivalent: 0,
        totalPerCurrency: [],
      };
    }

    return {
      totalUsdEquivalent: data.totalRewarded.totalUsdEquivalent - data.totalPaid.totalUsdEquivalent,
      totalPerCurrency: data.totalRewarded.totalPerCurrency
        ?.map(rewarded => {
          const paid = data.totalPaid.totalPerCurrency?.find(p => p.currency.id === rewarded.currency.id) || {
            usdEquivalent: 0,
          };

          const pendingUsdEquivalent = (rewarded.usdEquivalent || 0) - (paid.usdEquivalent || 0);

          if (pendingUsdEquivalent !== 0) {
            return {
              ...rewarded,
              usdEquivalent: pendingUsdEquivalent,
            };
          }

          return null;
        })
        .filter(item => item !== null),
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
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
    <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
      <FinancialCardItem
        title="myDashboard:budgetAvailable.rewarded.title"
        total={data.totalRewarded}
        color="gradient"
        onClick={() => openPanel("rewardedAmount", data.totalRewarded)}
      />

      <FinancialCardItem
        title="myDashboard:budgetAvailable.pending.title"
        total={rewardPendingAmount}
        color="grey"
        onClick={() => openPanel("rewardPendingAmount", rewardPendingAmount)}
      />

      <FinancialCardItem
        title="myDashboard:budgetAvailable.paid.title"
        total={data.totalPaid}
        color="grey"
        onClick={() => openPanel("rewardPaid", data.totalPaid)}
      />
    </div>
  );
}
