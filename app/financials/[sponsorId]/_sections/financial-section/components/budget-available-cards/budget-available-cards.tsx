import { useParams } from "next/navigation";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useFinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.hooks";
import { PanelMaintainerType } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.types";

export function BudgetAvailableCards() {
  const { sponsorId = "" } = useParams<{ sponsorId: string }>();

  const { open } = useFinancialDetailSidepanel();

  const { data, isLoading } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  if (isLoading) {
    return (
      <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
        <CardFinancialLoading />
        <CardFinancialLoading />
        <CardFinancialLoading />
        <CardFinancialLoading />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  function openPanel(panelType: PanelMaintainerType) {
    if (data) {
      open({
        panelType,
        total: data[panelType],
      });
    }
  }

  return (
    <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
      <FinancialCardItem
        title="financials:budgetAvailable.available.title"
        total={data.totalAvailable}
        color="gradient"
        onClick={() => openPanel("totalAvailable")}
      />
      <FinancialCardItem
        title="financials:budgetAvailable.allocated.title"
        total={data.totalAllocated}
        color="grey"
        onClick={() => openPanel("totalAllocated")}
      />
      <FinancialCardItem
        title="financials:budgetAvailable.granted.title"
        total={data.totalGranted}
        color="grey"
        onClick={() => openPanel("totalGranted")}
      />
      <FinancialCardItem
        title="financials:budgetAvailable.rewarded.title"
        total={data.totalRewarded}
        color="grey"
        onClick={() => openPanel("totalRewarded")}
      />
    </div>
  );
}
