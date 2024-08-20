import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { Translate } from "@/shared/translation/components/translate/translate";

import { CardTransactionTypes } from "./card-transaction.types";

export function getComponentsVariants(type: CardTransactionTypes): {
  icon: IconPort;
  typeName: ReactNode;
} {
  const map: Record<CardTransactionTypes, { icon: IconPort }> = {
    GRANTED: {
      icon: {
        name: "ri-arrow-right-line",
        className: "text-label-blue",
      },
    },
    RECEIVED: {
      icon: {
        name: "ri-arrow-down-line",
        className: "text-label-green",
      },
    },
    RETURNED: {
      icon: {
        name: "ri-arrow-turn-forward-line",
        className: "text-label-red",
      },
    },
  };

  return {
    icon: map[type].icon,
    typeName: <Translate token={`cards:cardTransaction.types.${type}`} />,
  };
}
