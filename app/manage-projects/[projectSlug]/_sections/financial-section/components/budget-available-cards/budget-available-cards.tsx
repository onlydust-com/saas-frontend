import { useParams } from "next/navigation";
import { useState } from "react";

import { FinancialDetailSidepanel } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel";
import { PanelType } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function BudgetAvailableCards() {
  const [panelType, setPanelType] = useState<PanelType>("totalAvailable");
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { Panel, open, isOpen } = useSidePanel({ name: "project-financial-detail" });

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsBySlug({
    pathParams: { projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  if (isLoading) {
    return (
      <div className="grid min-h-[150px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
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
          title="manageProjects:budgetAvailable.available.title"
          total={data.totalAvailable}
          color="gradient"
          onClick={() => openPanel("totalAvailable")}
        />
        <FinancialCardItem
          title="manageProjects:budgetAvailable.rewarded.title"
          total={data.totalRewarded}
          color="grey"
          onClick={() => openPanel("totalRewarded")}
        />
      </div>
      <Panel>
        <FinancialDetailSidepanel panelType={panelType} projectFinancial={data} />
      </Panel>
    </>
  );
}
