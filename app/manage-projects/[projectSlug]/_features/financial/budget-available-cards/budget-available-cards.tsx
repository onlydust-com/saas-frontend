import { useParams } from "next/navigation";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useFinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.hooks";
import { PanelMaintainerType } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.types";

export function BudgetAvailableCards() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { open } = useFinancialDetailSidepanel();

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

  function openPanel(panelType: Exclude<PanelMaintainerType, "totalAllocated">) {
    if (data) {
      open({
        panelType,
        total: data[panelType],
      });
    }
  }

  return (
    <div className="grid min-h-[150px] grid-cols-1 gap-lg tablet:grid-cols-2 desktop:grid-cols-3">
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
  );
}
