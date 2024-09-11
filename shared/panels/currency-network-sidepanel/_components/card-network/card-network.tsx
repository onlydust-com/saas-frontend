import { ChevronRight } from "lucide-react";

import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { CardTemplate } from "@/design-system/molecules/cards/card-template";

import { CardNetworkProps } from "@/shared/panels/currency-network-sidepanel/_components/card-network/card-network.types";

export function CardNetwork({ networkLogoUrl, networkName }: CardNetworkProps) {
  return (
    <CardTemplate
      avatarProps={{
        // TODO @hayden get correct logo
        src: networkLogoUrl,
      }}
      titleProps={{
        classNames: { base: "capitalize" },
        children: networkName?.toLowerCase(),
      }}
      actionSlot={
        <Badge
          as={"button"}
          htmlProps={{
            onClick: () => alert("test"),
          }}
          size={"sm"}
          color={"grey"}
          endContent={<Icon component={ChevronRight} />}
          translate={{ token: "panels:currencyNetwork.select" }}
        />
      }
      border={"none"}
      background={"transparent"}
      size={"none"}
    />
  );
}
