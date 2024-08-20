import { useParams } from "next/navigation";
import { useState } from "react";

import {
  CreateAvatarGroupProps,
  FinancialCardItemProps,
} from "@/app/programs/[programId]/_features/budget-available-cards/budget-available-cards.types";
import { FinancialDetailSidepanel } from "@/app/programs/[programId]/_features/financial-detail-sidepanel/financial-detail-sidepanel";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { bootstrap } from "@/core/bootstrap";

import { CardFinancial, CardFinancialLoading } from "@/design-system/molecules/card-financial";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

function createAvatarGroup({ total }: CreateAvatarGroupProps) {
  return {
    avatars:
      total.totalPerCurrency?.map(currency => ({
        src: currency.currency.logoUrl,
        name: currency.currency.name,
      })) ?? [],
  };
}

function FinancialCardItem({ title, total, color, onClick }: FinancialCardItemProps) {
  const avatarGroup = createAvatarGroup({ total });
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  return (
    <CardFinancial
      title={{ token: title }}
      amount={
        moneyKernelPort.format({ amount: total.totalUsdEquivalent, currency: moneyKernelPort.getCurrency("USD") })
          .amount
      }
      currency={moneyKernelPort.getCurrency("USD").code}
      avatarGroup={avatarGroup}
      color={color}
      cta={{
        onClick,
      }}
    />
  );
}

export function BudgetAvailableCards() {
  const [panelType, setPanelType] = useState<"totalAvailable" | "totalGranted" | "totalRewarded">("totalAvailable");
  const { programId = "" } = useParams<{ programId: string }>();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "financial-detail" });
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
      <div className="grid min-h-[220px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
        <CardFinancialLoading />
        <CardFinancialLoading />
        <CardFinancialLoading />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  function openPanel(panelType: "totalAvailable" | "totalGranted" | "totalRewarded") {
    setPanelType(panelType);
    if (!isOpen) {
      open();
    }
  }

  return (
    <>
      <div className="grid min-h-[220px] grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
        <FinancialCardItem
          title="programs:budgetAvailable.available.title"
          total={data.totalAvailable}
          color="chart-1"
          onClick={() => openPanel("totalAvailable")}
        />
        <FinancialCardItem
          title="programs:budgetAvailable.granted.title"
          total={data.totalGranted}
          color="chart-2"
          onClick={() => openPanel("totalGranted")}
        />
        <FinancialCardItem
          title="programs:budgetAvailable.rewarded.title"
          total={data.totalRewarded}
          color="chart-3"
          onClick={() => openPanel("totalRewarded")}
        />
      </div>
      <Panel>
        <FinancialDetailSidepanel panelType={panelType} program={data} />
      </Panel>
    </>
  );
}
