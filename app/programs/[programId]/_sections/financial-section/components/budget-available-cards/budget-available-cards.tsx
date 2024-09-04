import { useParams } from "next/navigation";
import { useState } from "react";

import { FinancialDetailSidepanel } from "@/app/programs/[programId]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel";
import { PanelType } from "@/app/programs/[programId]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function BudgetAvailableCards() {
  const [panelType, setPanelType] = useState<"totalAvailable" | "totalGranted" | "totalRewarded">("totalAvailable");
  const { programId = "" } = useParams<{ programId: string }>();
  const { Panel, open, isOpen } = useSidePanel({ name: "program-financial-detail" });
  const { data, isLoading } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });

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

  function openPanel(panelType: PanelType) {
    setPanelType(panelType);
    if (!isOpen) {
      open();
    }
  }

  return (
    <>
      <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
        <FinancialCardItem
          title="programs:budgetAvailable.available.title"
          total={data.totalAvailable}
          color="gradient"
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
        <FinancialDetailSidepanel panelType={panelType} program={data} />
      </Panel>
    </>
  );
}
