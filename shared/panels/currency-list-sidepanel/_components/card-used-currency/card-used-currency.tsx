import { ChevronRight } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { CardUsedCurrencyProps } from "@/shared/panels/currency-list-sidepanel/_components/card-used-currency/card-used-currency.types";
import { useCurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.hooks";

export function CardUsedCurrency({ budget }: CardUsedCurrencyProps) {
  const { open: openCurrencyNetworkSidepanel } = useCurrencyNetworkSidepanel();

  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const titleMoney = moneyKernelPort.format({
    amount: budget.amount,
    currency: budget.currency,
  });

  const descriptionMoney = moneyKernelPort.format({
    amount: budget.usdEquivalent,
    currency: moneyKernelPort.getCurrency("USD"),
  });

  return (
    <CardTemplate
      avatarProps={{ src: budget.currency.logoUrl }}
      titleProps={{
        children: `${titleMoney.amount} ${titleMoney.code}`,
      }}
      descriptionProps={{
        children: `~${descriptionMoney.amount} ${descriptionMoney.code}`,
      }}
      actionSlot={
        <Badge
          as={"button"}
          htmlProps={{
            onClick: openCurrencyNetworkSidepanel,
          }}
          size={"sm"}
          color={"grey"}
          endContent={<Icon component={ChevronRight} />}
          translate={{ token: "panels:currencyList.usedCurrencies.select" }}
        />
      }
      size={"none"}
      background={"transparent"}
      border={"none"}
    />
  );
}
