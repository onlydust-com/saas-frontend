import { useParams } from "next/navigation";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CardFinancialLoading } from "@/design-system/molecules/cards/card-financial/card-financial.loading";

import { FinancialCardItem } from "@/shared/features/financial-card-item/financial-card-item";
import { useFinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.hooks";
import { PanelMaintainerType } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.types";

export function BudgetAvailableCards() {
  const { programId = "" } = useParams<{ programId: string }>();

  const { open } = useFinancialDetailSidepanel();

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

  function openPanel(panelType: Exclude<PanelMaintainerType, "totalAllocated">) {
    if (data) {
      open({
        panelType,
        total: data[panelType],
      });
    }
  }

  return (
    <Paper
      border="primary"
      classNames={{
        base: "flex flex-col gap-lg",
      }}
    >
      <Typo
        weight="medium"
        size="md"
        color="primary"
        translate={{
          token: "programs:budgetAvailable.title",
        }}
      />

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
    </Paper>
  );
}
