"use client";

import { BudgetAvailableCards } from "@/app/(saas)/my-dashboard/financial/_features/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/(saas)/my-dashboard/financial/_features/rewards-table/rewards-table";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { MyRewardsTransactionsSidepanel } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel";
import { RewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

function MyDashboardFinancialPage() {
  return (
    <>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"myDashboard:detail.header.title"} />,
            href: NEXT_ROUTER.myDashboard.root,
          },
          {
            id: "financial",
            label: <Translate token={"myDashboard:detail.views.financial"} />,
          },
        ]}
      />
      <div className="flex h-full flex-col gap-lg overflow-hidden">
        <BudgetAvailableCards />
        <RewardsTable />
      </div>

      <FinancialDetailSidepanel />
      <RewardDetailSidepanel />
      <MyRewardsTransactionsSidepanel />
    </>
  );
}

export default withClientOnly(withAuthenticated(MyDashboardFinancialPage));
