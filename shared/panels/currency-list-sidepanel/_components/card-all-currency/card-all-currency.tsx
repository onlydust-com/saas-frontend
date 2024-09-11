import { Plus } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { CardAllCurrencyProps } from "@/shared/panels/currency-list-sidepanel/_components/card-all-currency/card-all-currency.types";

export function CardAllCurrency({ currency }: CardAllCurrencyProps) {
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
            onClick: () => alert("Add currency"),
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
