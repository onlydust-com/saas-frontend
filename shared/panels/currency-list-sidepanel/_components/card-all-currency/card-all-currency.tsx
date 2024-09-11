import { Plus } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { CardAllCurrencyProps } from "@/shared/panels/currency-list-sidepanel/_components/card-all-currency/card-all-currency.types";
import { useCurrencyNetworkSidepanel } from "@/shared/panels/currency-network-sidepanel/currency-network-sidepanel.hooks";

export function CardAllCurrency({ currency }: CardAllCurrencyProps) {
  const { open: openCurrencyNetworkSidepanel } = useCurrencyNetworkSidepanel();

  return (
    <CardTemplate
      avatarProps={{ src: currency.logoUrl }}
      titleProps={{
        children: currency.name,
      }}
      descriptionProps={{
        children: currency.code,
      }}
      actionSlot={
        <Badge
          as={"button"}
          htmlProps={{
            onClick: () => openCurrencyNetworkSidepanel({ currencyId: currency.id }),
          }}
          size={"sm"}
          color={"grey"}
          endContent={<Icon component={Plus} />}
          translate={{ token: "panels:currencyList.allCurrencies.new" }}
        />
      }
      size={"none"}
      background={"transparent"}
      border={"none"}
    />
  );
}
