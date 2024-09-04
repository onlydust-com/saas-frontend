import { useParams } from "next/navigation";
import { useState } from "react";

import { FinancialDetailSidepanel } from "@/app/financials/[sponsorId]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel";
import { PanelType } from "@/app/financials/[sponsorId]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.types";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function BudgetAvailableCards() {
  const [panelType, setPanelType] = useState<"totalDeposited" | "totalAvailable" | "totalGranted" | "totalRewarded">(
    "totalDeposited"
  );
  const { sponsorId = "" } = useParams<{ sponsorId: string }>();
  const { Panel, open, isOpen } = useSidePanel({ name: "sponsors-financial-detail" });

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

  function openPanel(panelType: PanelType) {
    setPanelType(panelType);
    if (!isOpen) {
      open();
    }
  }

  return (
    <>
      <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
        <FinancialCardItem
          title="financials:budgetAvailable.deposited.title"
          total={data.totalDeposited}
          color="gradient"
          onClick={() => openPanel("totalDeposited")}
        />
        <FinancialCardItem
          title="financials:budgetAvailable.allocated.title"
          total={data.totalAvailable}
          color="grey"
          onClick={() => openPanel("totalAvailable")}
        />
        <FinancialCardItem
          title="programs:budgetAvailable.granted.title"
          total={data.totalGranted}
          color="grey"
          onClick={() => openPanel("totalGranted")}
        />
        <FinancialCardItem
          title="programs:budgetAvailable.rewarded.title"
          total={data.totalRewarded}
          color="grey"
          onClick={() => openPanel("totalRewarded")}
        />
      </div>
      <Panel>
        <FinancialDetailSidepanel panelType={panelType} sponsor={data} />
      </Panel>
    </>
  );
}
