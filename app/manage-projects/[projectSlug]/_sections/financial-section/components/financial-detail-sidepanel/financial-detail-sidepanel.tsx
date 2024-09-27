import { useMemo } from "react";

import {
  FinancialDetailSidepanelProps,
  colorMapping,
} from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.types";

import { bootstrap } from "@/core/bootstrap";

import { CardBudget } from "@/design-system/molecules/cards/card-budget";
import { CardFinancial } from "@/design-system/molecules/cards/card-financial/variants/card-financial-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function FinancialDetailSidepanel({ panelType, sponsor }: FinancialDetailSidepanelProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const total = useMemo(() => {
    return sponsor[panelType];
  }, [panelType, sponsor]);

  return (
    <>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{ translate: { token: "manageProjects:financialDetailSidePanel.title" } }}
      />

      <SidePanelBody>
        <div className="flex flex-col gap-3">
          <CardFinancial
            title={{ token: `manageProjects:financialDetailSidePanel.${panelType}.title` }}
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
                usdEquivalent: currency.usdEquivalent ?? 0,
              }}
              badgeProps={{ children: currency.currency.name }}
            />
          ))}
        </div>
      </SidePanelBody>
    </>
  );
}
