import { bootstrap } from "@/core/bootstrap";

import { CardBudget } from "@/design-system/molecules/cards/card-budget";
import { CardFinancial } from "@/design-system/molecules/cards/card-financial/variants/card-financial-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useFinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.hooks";
import {
  FinancialDetailSidepanelData,
  FinancialDetailSidepanelProps,
  colorMapping,
} from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel.types";

export function FinancialDetailSidepanel({ footer }: FinancialDetailSidepanelProps) {
  const { name } = useFinancialDetailSidepanel();
  const { Panel } = useSidePanel({ name });
  const { panelType, total } = useSinglePanelData<FinancialDetailSidepanelData>(name) ?? {
    panelType: "totalAvailable",
    total: {},
  };

  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{ translate: { token: "panels:financialDetail.title" } }}
      />

      <SidePanelBody>
        <div className="flex flex-col gap-3">
          <CardFinancial
            title={{ token: `panels:financialDetail.${panelType}.title` }}
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

      {footer ? <SidePanelFooter>{footer}</SidePanelFooter> : null}
    </Panel>
  );
}
