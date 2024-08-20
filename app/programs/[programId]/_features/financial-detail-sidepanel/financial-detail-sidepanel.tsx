import { useMemo } from "react";

import {
  FinancialDetailSidepanelProps,
  colorMapping,
} from "@/app/programs/[programId]/_features/financial-detail-sidepanel/financial-detail-sidepanel.types";

import { bootstrap } from "@/core/bootstrap";

import { CardFinancial } from "@/design-system/molecules/card-financial";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function FinancialDetailSidepanel({ panelType, program }: FinancialDetailSidepanelProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const renderCardFinancial = useMemo(() => {
    if (!program) {
      return null;
    }

    const total = program[panelType];

    return (
      <CardFinancial
        title={{ token: `programs:financialDetailSidePanel.${panelType}.title` }}
        amount={
          moneyKernelPort.format({ amount: total.totalUsdEquivalent, currency: moneyKernelPort.getCurrency("USD") })
            .amount
        }
        currency="USD"
        avatarGroup={{
          avatars:
            total.totalPerCurrency?.map(currency => ({
              src: currency.currency.logoUrl,
              name: currency.currency.name,
            })) ?? [],
        }}
        color={colorMapping[panelType]}
      />
    );
  }, [panelType, program, moneyKernelPort]);

  return (
    <>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{ token: "programs:details.financial.detailSidePanel.title" }}
      />
      <div>{renderCardFinancial}</div>
    </>
  );
}
