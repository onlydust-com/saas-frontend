import { useMemo } from "react";

import {
  FinancialDetailSidepanelProps,
  colorMapping,
} from "@/app/programs/[programId]/_features/financial-detail-sidepanel/financial-detail-sidepanel.types";

import { bootstrap } from "@/core/bootstrap";

import { CardFinancial } from "@/design-system/molecules/card-financial";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function FinancialDetailSidepanel({ panelType, program }: FinancialDetailSidepanelProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const total = useMemo(() => {
    return program[panelType];
  }, [panelType, program]);

  return (
    <>
      <SidePanelHeader canGoBack={false} canClose={true} title={{ token: "programs:financialDetailSidePanel.title" }} />
      <div className="flex flex-col gap-3">
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
        {total.totalPerCurrency?.map(currency => (
          <CardBudget
            key={currency.currency.id}
            amount={{
              value: currency.prettyAmount,
              currency: currency.currency,
              usdEquivalent: total.totalUsdEquivalent,
            }}
            budgetPercentage={currency.ratio * 100}
          />
        ))}
      </div>
    </>
  );
}
